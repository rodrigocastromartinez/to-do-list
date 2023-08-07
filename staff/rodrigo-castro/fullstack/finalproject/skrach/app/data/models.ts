import mongoose from 'mongoose'
import { UserModel, ProjectModel } from './interfaces' // Import the interfaces

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
    },
    projects: {
        type: [ObjectId],
        ref: 'Project',
        required: true,
        default: []
    }
})

const project = new Schema<ProjectModel>({
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
    },
    image: {
        type: String,
        default: 'https://picsum.photos/500/500?random=1'
    }
})


const User = mongoose.models.User || model<UserModel>('User', user)
const Project = mongoose.models.Project || model<ProjectModel>('Project', project)

export {
    User,
    Project
}