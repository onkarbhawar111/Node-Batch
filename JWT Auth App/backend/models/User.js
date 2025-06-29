import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['user', 'admin'], default:'user' }
})

export default mongoose.model('User', UserSchema)
