// Dữ liệu các nút sidebar — dễ thêm mới sau này
const NAV_ITEMS = [
    { icon: '🍅', label: 'Timer', id: 'timer' },
    { icon: '✅', label: 'Tasks', id: 'tasks' },
    { icon: '🎵', label: 'Music', id: 'music' },
    { icon: '🏠', label: 'Rooms', id: 'rooms' },
]

export default function Sidebar({ activeItem, onNavigate }) {
    return (
        <>
            {/* Logo */}
            <div className="text-2xl mb-2">🍅</div>

            {/* Nav items */}
            <nav className="flex flex-col items-center gap-2 flex-1">
                {NAV_ITEMS.map(item => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        title={item.label}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center
                        text-lg transition-all duration-200
                        ${activeItem === item.id
                                ? 'bg-white/20 text-white scale-110'
                                : 'text-white/40 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        {item.icon}
                    </button>
                ))}
            </nav>

            {/* Avatar placeholder ở dưới cùng */}
            <div className="w-8 h-8 rounded-full bg-white/20
                      flex items-center justify-center
                      text-white/60 text-xs cursor-pointer
                      hover:bg-white/30 transition-colors">
                ?
            </div>
        </>
    )
}