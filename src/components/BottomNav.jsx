// Nav trái: weather, music, background
const LEFT_ITEMS = [
    { id: 'weather', icon: '🌤', label: 'Weather' },
    { id: 'music', icon: '🎵', label: 'Music' },
    { id: 'bg', icon: '🖼', label: 'Background' },
]

// Nav giữa: focus (nổi bật)
const CENTER_ITEM = { id: 'timer', icon: '⚡', label: 'Focus' }

// Nav phải: rooms, chat
const RIGHT_ITEMS = [
    { id: 'rooms', icon: '👥', label: 'Rooms' },
    { id: 'chat', icon: '💬', label: 'Chat' },
]

export default function BottomNav({ activePage, onNavigate }) {
    return (
        <nav className="flex justify-center pb-6 px-4">
            <div className="flex items-center gap-1
                      bg-white/10 backdrop-blur-md
                      border border-white/20
                      rounded-2xl px-3 py-2 shadow-xl">

                {/* Trái */}
                {LEFT_ITEMS.map(item => (
                    <NavButton
                        key={item.id}
                        item={item}
                        active={activePage === item.id}
                        onClick={() => onNavigate(item.id)}
                    />
                ))}

                {/* Divider */}
                <div className="w-px h-6 bg-white/15 mx-1" />

                {/* Giữa: Focus button nổi bật */}
                <button
                    onClick={() => onNavigate(CENTER_ITEM.id)}
                    title={CENTER_ITEM.label}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center
                      text-xl transition-all duration-200
                      ${activePage === CENTER_ITEM.id
                            ? 'bg-pink-500 shadow-lg shadow-pink-500/40 scale-110'
                            : 'text-white/60 hover:text-white hover:bg-white/15'
                        }`}
                >
                    {CENTER_ITEM.icon}
                </button>

                {/* Divider */}
                <div className="w-px h-6 bg-white/15 mx-1" />

                {/* Phải */}
                {RIGHT_ITEMS.map(item => (
                    <NavButton
                        key={item.id}
                        item={item}
                        active={activePage === item.id}
                        onClick={() => onNavigate(item.id)}
                    />
                ))}

            </div>
        </nav>
    )
}

function NavButton({ item, active, onClick }) {
    return (
        <button
            onClick={onClick}
            title={item.label}
            className={`w-11 h-11 rounded-xl flex items-center justify-center
                  text-xl transition-all duration-200
                  ${active
                    ? 'bg-white/25 text-white scale-105'
                    : 'text-white/60 hover:text-white hover:bg-white/15'
                }`}
        >
            {item.icon}
        </button>
    )
}