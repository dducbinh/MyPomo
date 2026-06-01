import { useState } from 'react'
import { PRESETS, getYouTubeId } from '../hooks/useMusicPlayer'

export default function MusicPanel({ musicPlayer, onClose }) {
	const { videoId, loadUrl, stop } = musicPlayer
	const [inputUrl, setInputUrl] = useState('')
	const [error, setError] = useState('')

	function handleSubmit(e) {
		e.preventDefault()
		const ok = loadUrl(inputUrl)
		if (!ok) setError('Link YouTube không hợp lệ')
		else { setError(''); setInputUrl('') }
	}

	return (
		<div className="fixed bottom-6 left-24 z-40
                    w-80 bg-gray-900/95 backdrop-blur-xl
                    border border-white/15 rounded-2xl shadow-2xl
                    overflow-hidden">

			{/* Header */}
			<div className="flex items-center justify-between px-4 py-3
                      border-b border-white/10">
				<span className="text-white font-semibold text-sm">🎵 Music</span>
				<div className="flex items-center gap-2">
					{videoId && (
						<button onClick={stop}
							className="text-white/40 hover:text-red-400 text-xs transition-colors">
							Stop
						</button>
					)}
					<button onClick={onClose}
						className="text-white/40 hover:text-white text-xl leading-none">
						×
					</button>
				</div>
			</div>

			<div className="p-4 flex flex-col gap-4">

				{/* Trạng thái đang phát */}
				{videoId ? (
					<div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5">
						<span className="text-green-400 text-lg animate-pulse">▶</span>
						<div className="flex-1 min-w-0">
							<p className="text-white text-xs font-medium">Đang phát</p>
							<p className="text-white/50 text-xs truncate">
								youtube.com/watch?v={videoId}
							</p>
						</div>
					</div>
				) : (
					<p className="text-white/40 text-xs text-center py-2">
						Chưa có nhạc — chọn preset hoặc paste link
					</p>
				)}

				{/* Input */}
				<form onSubmit={handleSubmit} className="flex gap-2">
					<input
						type="text"
						value={inputUrl}
						onChange={e => { setInputUrl(e.target.value); setError('') }}
						placeholder="Paste YouTube link..."
						className="flex-1 bg-white/10 text-white placeholder-white/30
                       rounded-xl px-3 py-2 text-xs outline-none
                       focus:bg-white/15 border border-white/10
                       focus:border-white/25 transition-colors"
					/>
					<button type="submit"
						className="bg-white/15 hover:bg-white/25 text-white
                       rounded-xl px-3 py-2 text-xs font-medium
                       transition-colors border border-white/10">
						Play
					</button>
				</form>

				{error && <p className="text-red-400 text-xs">{error}</p>}

				{/* Presets */}
				<div className="flex flex-col gap-1">
					<p className="text-white/40 text-xs mb-1">Gợi ý</p>
					{PRESETS.map(p => {
						const id = getYouTubeId(p.url)
						return (
							<button
								key={p.url}
								onClick={() => loadUrl(p.url)}
								className={`text-left px-3 py-2 rounded-lg text-xs
                            transition-colors flex items-center gap-2
                            ${id === videoId
										? 'bg-white/20 text-white'
										: 'text-white/60 hover:bg-white/10 hover:text-white'
									}`}
							>
								{id === videoId && <span className="text-green-400">▶</span>}
								{p.label}
							</button>
						)
					})}
				</div>

			</div>
		</div>
	)
}