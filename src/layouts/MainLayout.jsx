export default function MainLayout({ sidebar, main, panel }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-500 to-pink-700
                    flex overflow-hidden">

            {/* --- Sidebar trái --- */}
            <aside className="w-16 flex flex-col items-center py-6 gap-6
                        bg-black/20 border-r border-white/10 flex-shrink-0">
                {sidebar}
            </aside>

            {/* --- Vùng giữa: Timer --- */}
            <main className="flex-1 flex flex-col items-center justify-center p-8 min-w-0">
                {main}
            </main>

            {/* --- Panel phải: Todo --- */}
            <aside className="w-80 flex flex-col py-6 px-4 gap-4
                        bg-black/20 border-l border-white/10
                        flex-shrink-0 overflow-y-auto">
                {panel}
            </aside>

        </div>
    )
}