import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,   // ← gửi cookie theo mỗi request
})

export const authService = {
    getMe: () => api.get('/auth/me'),
    logout: () => api.post('/auth/logout'),
    loginWithGoogle: () => {
        window.location.href = 'http://localhost:5000/api/auth/google'
    },
}