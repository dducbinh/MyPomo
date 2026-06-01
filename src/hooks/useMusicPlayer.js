import { useState } from 'react'

function getYouTubeId(url) {
    const patterns = [
        /youtube\.com\/watch\?v=([^&]+)/,
        /youtu\.be\/([^?]+)/,
        /youtube\.com\/embed\/([^?]+)/,
    ]
    for (const p of patterns) {
        const m = url.match(p)
        if (m) return m[1]
    }
    return null
}

export const PRESETS = [
    { label: 'Lo-fi Hip Hop', url: 'https://www.youtube.com/live/EWrX250Zhko?si=IIIUr7Mg9q_c6c6s' },
    { label: 'Jazz & Bossa Nova', url: 'https://www.youtube.com/watch?v=Dx5qFachd3A' },
    { label: 'Deep Focus', url: 'https://www.youtube.com/watch?v=5qap5aO4i9A' },
    { label: 'Piano Study', url: 'https://www.youtube.com/watch?v=lTRiuFIWV54' },
]

export { getYouTubeId }

export function useMusicPlayer() {
    const [videoId, setVideoId] = useState(null)   // null = chưa chọn
    const [isPlaying, setIsPlaying] = useState(false)

    function loadUrl(url) {
        const id = getYouTubeId(url)
        if (id) {
            setVideoId(id)
            setIsPlaying(true)
            return true
        }
        return false
    }

    function stop() {
        setVideoId(null)
        setIsPlaying(false)
    }

    return { videoId, isPlaying, loadUrl, stop }
}