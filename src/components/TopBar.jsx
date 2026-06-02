import { useAuthStore } from '../store/useAuthStore'
import { authService } from '../services/authService'

export default function TopBar() {
    const { user, logout } = useAuthStore()

    return (
        <header className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
                <span className="text-white font-bold text-xl tracking-tight">
                    🍅 MyPomo
                </span>
            </div>

            <div className="flex items-center gap-2">
                {user ? (
                    // login: avatar + dropdown logout
                    <div className="relative group">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-full border-2 border-white/30
                         cursor-pointer hover:border-white/60 transition-colors"
                        />
                        {/* Dropdown */}
                        <div className="absolute right-0 top-full mt-2 w-40
                            bg-gray-900/95 border border-white/15 rounded-xl
                            shadow-2xl opacity-0 group-hover:opacity-100
                            pointer-events-none group-hover:pointer-events-auto
                            transition-opacity overflow-hidden">
                            <div className="px-3 py-2 border-b border-white/10">
                                <p className="text-white text-xs font-medium truncate">{user.name}</p>
                                <p className="text-white/40 text-xs truncate">{user.email}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="w-full text-left px-3 py-2 text-xs text-white/60
                           hover:text-white hover:bg-white/10 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    // nút Login
                    <button
                        onClick={authService.loginWithGoogle}
                        className="flex items-center gap-2 bg-white/15 hover:bg-white/25
                       text-white text-sm px-4 py-2 rounded-full
                       border border-white/20 transition-all"
                    >
                        <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
                        Login with Google
                    </button>
                )}
            </div>
        </header>
    )
}