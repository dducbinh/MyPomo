import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import passport from './config/passport.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,   // cookie hoạt động cross-origin
}))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(process.env.PORT, () =>
            console.log(`Server running on port ${process.env.PORT}`)
        )
    })