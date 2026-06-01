import { useState } from 'react'
import PomodoroTimer from './components/PomodoroTimer'
import LeftDock from './components/LeftDock'
import RightDock from './components/RightDock'
import TopBar from './components/TopBar'
import WhiteNoisePanel from './components/WhiteNoisePanel'
import MusicPanel from './components/MusicPanel'
import BackgroundPanel from './components/BackgroundPanel'
import { useAudioManager } from './hooks/useAudioManager'
import { useMusicPlayer } from './hooks/useMusicPlayer'

export const BACKGROUNDS = [
	{ id: 'mountains', label: 'Mountains', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80' },
	{ id: 'forest', label: 'Forest', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80' },
	{ id: 'ocean', label: 'Ocean', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80' },
	{ id: 'city', label: 'City Night', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80' },
	{ id: 'cafe', label: 'Café', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80' },
	{ id: 'desert', label: 'Desert', url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=80' },
]

export default function App() {
	const [bgUrl, setBgUrl] = useState(BACKGROUNDS[0].url)
	const [openPanel, setOpenPanel] = useState(null)
	const [activePage, setActivePage] = useState(null)

	// Audio state sống ở App — không mất khi đóng popup
	const audioManager = useAudioManager()
	const musicPlayer = useMusicPlayer()

	function togglePanel(name) {
		setOpenPanel(prev => prev === name ? null : name)
	}

	return (
		<div className="relative min-h-screen w-full overflow-hidden">

			{/* Background */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
				style={{ backgroundImage: `url('${bgUrl}')` }}
			/>
			<div className="absolute inset-0 bg-black/30" />

			{/* YouTube iframe ẩn — chạy background khi popup đóng */}
			{musicPlayer.videoId && (
				<iframe
					key={musicPlayer.videoId}
					src={`https://www.youtube.com/embed/${musicPlayer.videoId}?autoplay=1&rel=0`}
					allow="autoplay; encrypted-media"
					className="absolute -top-full -left-full w-1 h-1 opacity-0 pointer-events-none"
					title="bg-music"
				/>
			)}

			{/* Content */}
			<div className="relative z-10 min-h-screen flex flex-col">
				<TopBar />

				<main className="flex-1 flex items-center justify-center px-4">
					<PomodoroTimer />
				</main>

				{/* Dock trái */}
				<LeftDock openPanel={openPanel} onTogglePanel={togglePanel} />

				{/* Dock phải */}
				<RightDock activePage={activePage} onNavigate={setActivePage} />
			</div>

			{/* Popups góc trái */}
			{openPanel === 'noise' && (
				<WhiteNoisePanel
					audioManager={audioManager}
					onClose={() => setOpenPanel(null)}
				/>
			)}
			{openPanel === 'music' && (
				<MusicPanel
					musicPlayer={musicPlayer}
					onClose={() => setOpenPanel(null)}
				/>
			)}
			{openPanel === 'bg' && (
				<BackgroundPanel
					current={bgUrl}
					onSelect={url => { setBgUrl(url); setOpenPanel(null) }}
					onClose={() => setOpenPanel(null)}
				/>
			)}

		</div>
	)
}