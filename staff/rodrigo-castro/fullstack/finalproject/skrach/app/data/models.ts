import mongoose from 'mongoose'
import { UserModel, PostModel } from './interfaces'; // Import the interfaces

const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const user = new Schema<UserModel>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
    avatar: {
        type: String,
        required: false
    }
})

const project = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    owners: {
        type: [ObjectId],
        ref: 'User'
    },
    privacy: {
        type: String,
        required: true,
        default: 'privated'
    },
    tracks: {
        type: [String],
    }
})


const User = mongoose.models.User || model<UserModel>('User', user)
const Project = mongoose.models.Project || model('Project', project)

export {
    User,
    Project
}