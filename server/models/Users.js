import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: String,
    provider: { type: String, default: 'google' },
}, { timestamps: true })

export default mongoose.model('User', userSchema)