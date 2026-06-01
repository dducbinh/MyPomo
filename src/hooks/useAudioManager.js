import { useState, useRef, useEffect } from 'react'

export const SOUNDS = [
    { id: 'rain', label: 'Rain', icon: '🌧' },
    { id: 'wind', label: 'Wind', icon: '🌬' },
    { id: 'wave', label: 'Ocean Waves', icon: '🌊' },
    { id: 'fire', label: 'Fireplace', icon: '🔥' },
    { id: 'forest', label: 'Forest', icon: '🌿' },
    { id: 'cafe', label: 'Café', icon: '☕' },
]

// Dùng oscillator để tạo white noise thật sự (không cần file mp3)
function createWhiteNoiseNode(audioCtx) {
    const bufferSize = 2 * audioCtx.sampleRate
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
    }
    const source = audioCtx.createBufferSource()
    source.buffer = buffer
    source.loop = true
    return source
}

// Tần số đặc trưng cho từng loại âm thanh
const SOUND_CONFIG = {
    rain: { type: 'noise', filterFreq: 800, filterType: 'lowpass' },
    wind: { type: 'noise', filterFreq: 400, filterType: 'lowpass' },
    wave: { type: 'noise', filterFreq: 600, filterType: 'bandpass' },
    fire: { type: 'noise', filterFreq: 1200, filterType: 'lowpass' },
    forest: { type: 'noise', filterFreq: 2000, filterType: 'bandpass' },
    cafe: { type: 'noise', filterFreq: 1500, filterType: 'bandpass' },
}

export function useAudioManager() {
    // volumes: { id: 0-100 } — 0 nghĩa là tắt
    const [volumes, setVolumes] = useState({})
    // noiseEnabled: bật/tắt toàn bộ white noise
    const [noiseEnabled, setNoiseEnabled] = useState(false)

    const audioCtxRef = useRef(null)
    const nodesRef = useRef({}) // { id: { source, gainNode, filter } }

    // Khởi tạo AudioContext lần đầu user interact
    function getAudioCtx() {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
        }
        return audioCtxRef.current
    }

    // Tạo node cho 1 sound
    function createNode(id) {
        const ctx = getAudioCtx()
        const config = SOUND_CONFIG[id]
        const source = createWhiteNoiseNode(ctx)
        const filter = ctx.createBiquadFilter()
        filter.type = config.filterType
        filter.frequency.value = config.filterFreq
        const gainNode = ctx.createGain()
        gainNode.gain.value = 0
        source.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(ctx.destination)
        source.start()
        return { source, gainNode, filter }
    }

    // Cập nhật gain khi volumes hoặc noiseEnabled thay đổi
    useEffect(() => {
        SOUNDS.forEach(({ id }) => {
            const vol = volumes[id] ?? 0
            const targetGain = noiseEnabled && vol > 0 ? vol / 100 : 0

            if (targetGain > 0) {
                // Tạo node nếu chưa có
                if (!nodesRef.current[id]) {
                    nodesRef.current[id] = createNode(id)
                }
                nodesRef.current[id].gainNode.gain.setTargetAtTime(
                    targetGain,
                    getAudioCtx().currentTime,
                    0.1
                )
            } else if (nodesRef.current[id]) {
                nodesRef.current[id].gainNode.gain.setTargetAtTime(
                    0,
                    getAudioCtx().currentTime,
                    0.1
                )
            }
        })
    }, [volumes, noiseEnabled])

    function setVolume(id, val) {
        setVolumes(prev => ({ ...prev, [id]: Number(val) }))
    }

    // Toggle một sound: nếu đang có volume thì tắt, nếu đang tắt thì mở 60
    function toggleSound(id) {
        setVolumes(prev => ({
            ...prev,
            [id]: prev[id] > 0 ? 0 : 60,
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