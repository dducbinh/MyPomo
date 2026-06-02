import { useState } from 'react'
import { PRESETS, getYouTubeId } from '../hooks/useMusicPlayer'

const DEFAULT_URL = 'https://www.youtube.com/watch?v=EWrX250Zhko'
const DEFAULT_ID = getYouTubeId(DEFAULT_URL)

export default function MusicPanel({ musicPlayer, isOpen, onClose }) {
	const { videoId, loadUrl } = musicPlayer
	const currentId = videoId ?? DEFAULT_ID

	const [inputUrl, setInputUrl] = useState('')
	const [error, setError] = useState('')
	const [showInput, setShowInput] = useState(false)

	function handleSubmit(e) {
		e.preventDefault()
		const ok = loadUrl(inputUrl)
		if (!ok) {
			setError('Link YouTube không hợp lệ')
		} else {
			setError('')
			setInputUrl('')
			setShowInput(false)
		}
	}

	return (
		// Dùng visibility + pointer-events
		<div
			className="fixed bottom-6 left-24 z-40
                 w-80 bg-gray-900/95 backdrop-blur-xl
                 border border-white/15 rounded-2xl shadow-2xl
                 overflow-hidden transition-all duration-200"
			style={{
				visibility: isOpen ? 'visible' : 'hidden',
				opacity: isOpen ? 1 : 0,
				pointerEvents: isOpen ? 'auto' : 'none',
				transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
			}}
		>
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-3
                      border-b border-white/10">
				<span className="text-white font-semibold text-sm">🎵 Music</span>
				<div className="flex items-center gap-2">
					{showInput ? (
						<form
							onSubmit={handleSubmit}
							className="flex items-center gap-2"
						>
							<input
								type="text"
								value={inputUrl}
								onChange={(e) => {
									setInputUrl(e.target.value)
									setError('')
								}}
								placeholder="YouTube link..."
								autoFocus
								className="w-32 bg-white/10 text-white
							placeholder-white/30 rounded-lg
							px-2 py-1 text-xs outline-none
							border border-white/10
							focus:border-white/25"
							/>

							<button
								type="submit"
								className="px-2 py-1 text-xs
							bg-white/15 hover:bg-white/25
							text-white rounded-lg"
							>
								Play
							</button>
						</form>
					) : (
						<button
							onClick={() => setShowInput(true)}
							className="text-white/40 hover:text-white text-xs
						transition-colors border border-white/20
						px-2 py-1 rounded-lg hover:border-white/40"
						>
							Change
						</button>
					)}

					<button
						onClick={onClose}
						className="text-white/40 hover:text-white text-xl leading-none"
					>
						×
					</button>
				</div>
			</div>
			{error && (
				<div className="px-4 py-2 text-xs text-red-400 border-b border-white/10">
					{error}
				</div>
			)}

			<div className="flex flex-col gap-3 p-4">

				{/* YouTube iframe */}
				<div className="rounded-xl overflow-hidden bg-black"
					style={{ aspectRatio: '16/9' }}>
					<iframe
						key={currentId}
						src={`https://www.youtube.com/embed/${currentId}?autoplay=0&rel=0`}
						allow="autoplay; encrypted-media"
						allowFullScreen
						className="w-full h-full"
						title="music-player"
					/>
				</div>


				{/* Presets */}
				<div className="flex flex-col gap-1">
					<p className="text-white/40 text-xs mb-1">Recommend</p>
					{PRESETS.map(p => {
						const id = getYouTubeId(p.url)
						return (
							<button
								key={p.url}
								onClick={() => loadUrl(p.url)}
								className={`text-left px-0 py-2 rounded-lg text-xs
                            transition-colors flex items-center gap-2
                            ${id === currentId
										? 'bg-white/20 text-white'
										: 'text-white/60 hover:bg-white/10 hover:text-white'
									}`}
							>
								<span className={id === currentId ? 'text-green-400' : 'text-white/20'}>
								</span>
								{p.label}
							</button>
						)
					})}
				</div>

			</div>
		</div>
	)
}