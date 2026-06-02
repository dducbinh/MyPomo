import { create } from 'zustand'
import { authService } from '../services/authService'

export const useAuthStore = create((set) => ({
    user: null,
    loading: true,

    fetchUser: async () => {
        try {
            const { data } = await authService.getMe()
            set({ user: data, loading: false })
        } catch {
            set({ user: null, loading: false })
        }
    },

    logout: async () => {
        await authService.logout()
        set({ user: null })
    },
}))