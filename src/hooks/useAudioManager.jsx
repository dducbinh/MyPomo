import { useState, useRef, useEffect } from 'react'
import { Cafe, Fire, Rain, WaterWaveBig, WindStrong } from 'griddy-icons'

export const SOUNDS = [
    { id: 'rain',   label: 'Rain',         icon: <Rain size={32}/>, url: 'https://www.soundjay.com/nature_c2026/sounds/rain-07.mp3' },
    { id: 'wind',   label: 'Wind',         icon: <WindStrong size={32}/>, url: 'https://www.soundjay.com/nature_c2026/sounds/windy-forest-ambience-01.mp3' },
    { id: 'wave',   label: 'Ocean Waves',  icon: <WaterWaveBig size={32}/>, url: 'https://www.soundjay.com/nature_c2026/sounds/ocean-waves-1.mp3' },
    { id: 'fire',   label: 'Fireplace',    icon: <Fire size={32}/>, url: 'https://www.soundjay.com/nature_c2026/sounds/campfire-1.mp3' },
    { id: 'cafe',   label: 'Café',         icon: <Cafe size={32}/>, url: 'https://www.soundjay.com/ambient_c2026/sounds/people-in-lounge-1.mp3' },
]

export function useAudioManager() {
    const [volumes, setVolumes]           = useState({})
    const [noiseEnabled, setNoiseEnabled] = useState(false)

    // { id: HTMLAudioElement }
    const audioRefs = useRef({})

    // Khởi tạo Audio objects
    useEffect(() => {
        SOUNDS.forEach(s => {
            if (!audioRefs.current[s.id]) {
                const audio = new Audio(s.url)
                audio.loop = true
                audioRefs.current[s.id] = audio
            }
        })

        // Cleanup khi unmount
        return () => {
            Object.values(audioRefs.current).forEach(a => {
                a.pause()
                a.src = ''
            })
            audioRefs.current = {}
        }
    }, [])

    // Sync play/pause + volume
    useEffect(() => {
        SOUNDS.forEach(({ id }) => {
            const audio = audioRefs.current[id]
            if (!audio) return

            const vol = volumes[id] ?? 0
            const shouldPlay = noiseEnabled && vol > 0

            if (shouldPlay) {
                audio.volume = vol / 100
                // play() trả về Promise
                audio.play().catch(() => {})
            } else {
                audio.pause()
            }
        })
    }, [volumes, noiseEnabled])

    function setVolume(id, val) {
        setVolumes(prev => ({ ...prev, [id]: Number(val) }))
    }

    // Toggle
    function toggleSound(id) {
        setVolumes(prev => ({
            ...prev,
            [id]: (prev[id] ?? 0) > 0 ? 0 : 60,
        }))
    }

    return {
        volumes,
        noiseEnabled,
        setNoiseEnabled,
        setVolume,
        toggleSound,
    }
}