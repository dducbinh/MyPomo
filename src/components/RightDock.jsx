import { UsersGroup, ChatBubble } from 'griddy-icons'

const ITEMS = [
    { id: 'rooms', icon: <UsersGroup size={28} />, label: 'Rooms' },
    { id: 'chat', icon: <ChatBubble size={28} />, label: 'Chat' },
]

export default function RightDock({ activePage, onNavigate }) {
    return (
        <div className="fixed bottom-6 right-6 z-30
                    flex flex-col items-center gap-1
                    bg-white/10 backdrop-blur-md
                    border border-white/20
                    rounded-2xl px-2 py-2 shadow-xl">
            {ITEMS.map(item => (
                <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    title={item.label}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center
                      text-xl transition-all duration-200
                      ${activePage === item.id
                            ? 'bg-white/25 text-white scale-105'
                            : 'text-white/60 hover:text-white hover:bg-white/15'
                        }`}
                >
                    {item.icon}
                </button>
            ))}
        </div>
    )
}