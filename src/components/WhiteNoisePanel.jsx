import { SOUNDS } from '../hooks/useAudioManager'

export default function WhiteNoisePanel({ audioManager, onClose }) {
    const { volumes, noiseEnabled, setNoiseEnabled, setVolume, toggleSound } = audioManager

    return (
        <div className="fixed bottom-6 left-24 z-40
                    w-72 bg-gray-900/95 backdrop-blur-xl
                    border border-white/15 rounded-2xl shadow-2xl
                    overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3
                      border-b border-white/10">
                <span className="text-white font-semibold text-sm">🌧 White Noises</span>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setNoiseEnabled(e => !e)}
                        className={`w-10 h-6 rounded-full transition-colors relative
              ${noiseEnabled ? 'bg-blue-500' : 'bg-white/20'}`}
                    >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full
                              transition-all duration-200 shadow
                              ${noiseEnabled ? 'left-5' : 'left-1'}`} />
                    </button>
                    <button onClick={onClose}
                        className="text-white/40 hover:text-white text-xl leading-none">
                        ×
                    </button>
                </div>
            </div>

            {/* Sound list */}
            <div className="p-3 flex flex-col gap-1 max-h-72 overflow-y-auto">
                {SOUNDS.map(s => {
                    const vol = volumes[s.id] ?? 0
                    const active = noiseEnabled && vol > 0

                    return (
                        <div key={s.id}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl
                          transition-colors
                          ${active ? 'bg-white/15' : 'hover:bg-white/8'}`}
                        >
                            {/* Click icon/label để toggle */}
                            <button
                                onClick={() => toggleSound(s.id)}
                                className="flex items-center gap-2 flex-1 text-left"
                            >
                                <span className="text-xl">{s.icon}</span>
                                <span className={`text-sm transition-colors
                  ${active ? 'text-white' : 'text-white/50'}`}>
                                    {s.label}
                                </span>
                            </button>

                            {/* Slider chỉ hiện khi vol > 0
                  Kéo về 0 → slider biến mất, phải click lại để bật */}
                            {vol > 0 && (
                                <input
                                    type="range" min="1" max="100" value={vol}
                                    onChange={e => setVolume(s.id, e.target.value)}
                                    onClick={e => e.stopPropagation()}
                                    className="w-20 accent-white cursor-pointer"
                                />
                            )}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}