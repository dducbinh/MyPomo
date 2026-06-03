import { Rain, Music, Image } from 'griddy-icons'

const ITEMS = [
    { id: 'noise', icon: <Rain size={28}  />, label: 'White Noise' },
    { id: 'music', icon: <Music size={28}  />, label: 'Music' },
    { id: 'bg', icon: <Image size={28}  />, label: 'Background' },
]

export default function LeftDock({ openPanel, onTogglePanel }) {
    return (
        <div className="fixed bottom-6 left-6 z-30
                    flex flex-col items-center gap-1
                    bg-white/10 backdrop-blur-md
                    border border-white/20
                    rounded-2xl px-2 py-2 shadow-xl">
            {ITEMS.map(item => (
                <button
                    key={item.id}
                    onClick={() => onTogglePanel(item.id)}
                    title={item.label}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center
                      text-xl transition-all duration-200
                      ${openPanel === item.id
                            ? 'bg-white/30 text-white scale-105'
                            : 'text-white/60 hover:text-white hover:bg-white/15'
                        }`}
                >
                    {item.icon}
                </button>
            ))}
        </div>
    )
}