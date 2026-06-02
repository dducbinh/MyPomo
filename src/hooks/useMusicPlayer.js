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
    { label: 'Piano Study', url: 'https://www.youtube.com/watch?v=cYPJaHT5f3E' },
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