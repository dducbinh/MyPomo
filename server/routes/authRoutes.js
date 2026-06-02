import express from 'express'
import passport from '../config/passport.js'
import jwt from 'jsonwebtoken'
import { authenticate } from '../middleware/authenticate.js'
import User from '../models/User.js'

const router = express.Router()

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}

// Redirect  Google
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
)

// Google callback
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL}/login` }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        })

        res.cookie('token', token, COOKIE_OPTIONS)
        res.redirect(`${process.env.CLIENT_URL}`)
    }
)

// Lấy thông tin user
router.get('/me', authenticate, async (req, res) => {
    const user = await User.findById(req.userId).select('-googleId')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
})

// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token', COOKIE_OPTIONS)
    res.json({ message: 'Logged out' })
})

export default router