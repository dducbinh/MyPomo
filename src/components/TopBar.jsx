export default function TopBar() {
    return (
        <header className="flex items-center justify-between px-6 py-4">

            {/* Logo bên trái */}
            <div className="flex items-center gap-2">
                <span className="text-white font-bold text-xl tracking-tight">
                    🍅 MyPomo
                </span>
            </div>

            {/* Stats bên phải */}
            <div className="flex items-center gap-2">
                {/* Avatar placeholder */}
                <div className="w-9 h-9 rounded-full bg-rose-500 border-2 border-white/30
                        flex items-center justify-center
                        text-white text-sm font-bold cursor-pointer
                        hover:border-white/60 transition-colors ml-1">
                    U
                </div>
            </div>

        </header>
    )
}

function StatPill({ icon, value }) {
    return (
        <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm
                    border border-white/20 rounded-full px-3 py-1.5
                    text-white text-sm">
            <span>{icon}</span>
            <span className="font-medium">{value}</span>
        </div>
    )
}