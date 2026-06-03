import { BACKGROUNDS } from '../App'

export default function BackgroundPanel({ current, onSelect, onClose }) {
    return (
        <div className="fixed bottom-6 left-24 z-40
                    w-80 bg-gray-900/95 backdrop-blur-xl
                    border border-white/15 rounded-2xl shadow-2xl
                    overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3
                      border-b border-white/10">
                <span className="text-white font-semibold text-sm">Background</span>
                <button onClick={onClose}
                    className="text-white/40 hover:text-white text-lg leading-none">
                    ×
                </button>
            </div>

            {/* Grid ảnh */}
            <div className="p-3 grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                {BACKGROUNDS.map(bg => (
                    <button
                        key={bg.id}
                        onClick={() => onSelect(bg.url)}
                        className={`relative rounded-xl overflow-hidden aspect-video
                        transition-all duration-200 group
                        ${current === bg.url
                                ? 'ring-2 ring-white scale-95'
                                : 'hover:scale-95 hover:ring-2 hover:ring-white/50'
                            }`}
                    >
                        <img
                            src={bg.url.replace('w=1920', 'w=400')}
                            alt={bg.label}
                            className="w-full h-full object-cover"
                        />
                        {/* Label overlay */}
                        <div className="absolute inset-0 bg-black/30 flex items-end p-2
                            opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-medium">{bg.label}</span>
                        </div>
                        {/* Selected checkmark */}
                        {current === bg.url && (
                            <div className="absolute inset-0 bg-black/20 flex items-center
                              justify-center">
                                <span className="text-white text-2xl">✓</span>
                            </div>
                        )}
                    </button>
                ))}
            </div>

        </div>
    )
}