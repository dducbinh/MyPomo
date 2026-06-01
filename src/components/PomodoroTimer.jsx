import { useState, useEffect, useRef } from 'react'
import TodoList from './TodoList'

const MODES = {
	focus: { label: 'Focus', duration: 25 * 60 },
	shortBreak: { label: 'Short Break', duration: 5 * 60 },
	longBreak: { label: 'Long Break', duration: 15 * 60 },
}

function formatTime(seconds) {

	const m = Math.floor(seconds / 60).toString().padStart(2, '0')
	const s = (seconds % 60).toString().padStart(2, '0')
	return `${m}:${s}`
}

export default function PomodoroTimer() {
	const [mode, setMode] = useState('focus')
	const [timeLeft, setTimeLeft] = useState(MODES.focus.duration)
	const [isRunning, setIsRunning] = useState(false)
	const [round, setRound] = useState(1)
	const [showTodo, setShowTodo] = useState(false)
	const intervalRef = useRef(null)

	useEffect(() => {
		if (isRunning) {
			intervalRef.current = setInterval(() => {
				setTimeLeft(prev => {
					if (prev <= 1) {
						clearInterval(intervalRef.current)
						handleTimerEnd()
						return 0
					}
					return prev - 1
				})
			}, 1000)
		} else {
			clearInterval(intervalRef.current)
		}
		return () => clearInterval(intervalRef.current)
	}, [isRunning])

	useEffect(() => {
		document.title = `${formatTime(timeLeft)} — ${MODES[mode].label}`
		return () => { document.title = 'MyPomo' }
	}, [timeLeft, mode])

	function handleTimerEnd() {
		playBeep()
		if (mode === 'focus') {
			switchMode(round % 4 === 0 ? 'longBreak' : 'shortBreak')
			setRound(r => r + 1)
		} else {
			switchMode('focus')
		}
	}

	function switchMode(newMode) {
		setMode(newMode)
		setTimeLeft(MODES[newMode].duration)
		setIsRunning(false)
	}

	function handleReset() {
		clearInterval(intervalRef.current)
		setTimeLeft(MODES[mode].duration)
		setIsRunning(false)
	}

	function playBeep() {
		try {
			const ctx = new AudioContext()
			const osc = ctx.createOscillator()
			const gain = ctx.createGain()
			osc.connect(gain)
			gain.connect(ctx.destination)
			osc.frequency.value = 800
			gain.gain.setValueAtTime(0.3, ctx.currentTime)
			gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)
			osc.start()
			osc.stop(ctx.currentTime + 0.8)
		} catch (e) { }
	}

	return (
		<>
			<div className="flex flex-col items-center gap-8">

				{/* Mode dots */}
				<div className="flex gap-3 items-center">
					{Object.keys(MODES).map((key) => (
						<button
							key={key}
							onClick={() => { clearInterval(intervalRef.current); switchMode(key) }}
							title={MODES[key].label}
							className={`rounded-full transition-all duration-300
                ${mode === key
									? 'w-4 h-4 bg-white'
									: 'w-3 h-3 bg-white/40 hover:bg-white/70'
								}`}
						/>
					))}
				</div>

				{/* Timer */}
				<div className="text-[9rem] font-bold text-white leading-none
                        tracking-tight drop-shadow-2xl
                        [text-shadow:0_4px_40px_rgba(0,0,0,0.4)]">
					{formatTime(timeLeft)}
				</div>

				{/* +1 +5 +10 */}
				<div className="flex gap-3">
					{[1, 5, 10].map(min => (
						<button
							key={min}
							onClick={() => setTimeLeft(t => t + min * 60)}
							className="text-white/50 hover:text-white/90 text-sm
                         transition-colors px-2"
						>
							+{min}
						</button>
					))}
				</div>

				{/* What are you working on — mở TodoPopup */}
				<button
					onClick={() => setShowTodo(true)}
					className="flex items-center gap-2 text-white/70 text-sm
                     hover:text-white transition-colors
                     bg-white/10 backdrop-blur-sm border border-white/20
                     px-5 py-2.5 rounded-full hover:bg-white/20"
				>
					<span>📋</span>
					<span>What are you working on?</span>
				</button>

				{/* Nút điều khiển — chỉ còn Reset + Start */}
				<div className="flex items-center gap-4">
					<button
						onClick={handleReset}
						className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm
                       border border-white/25 text-white text-lg
                       hover:bg-white/25 transition-all"
						title="Reset"
					>
						↺
					</button>

					<button
						onClick={() => setIsRunning(r => !r)}
						className="bg-white text-gray-900 font-bold text-lg
                       px-14 py-4 rounded-full
                       hover:scale-105 active:scale-95
                       transition-transform shadow-2xl
                       shadow-black/30 min-w-[180px]"
					>
						{isRunning ? 'Pause' : 'Start'}
					</button>
				</div>

				{/* Round indicator */}
				<p className="text-white/40 text-xs">
					Round {round} · {MODES[mode].label}
				</p>

			</div>

			{/* Todo Popup */}
			{showTodo && <TodoList onClose={() => setShowTodo(false)} />}
		</>
	)
}