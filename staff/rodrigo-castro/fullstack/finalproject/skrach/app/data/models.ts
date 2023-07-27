import mongoose from 'mongoose'

const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const user = new Schema({
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
    savedPosts: {
        type: [ObjectId],
        ref: 'Post'
    }
})

const post = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likedBy: {
        type: [ObjectId],
        ref: 'User'
    },
    privacy: {
        type: String,
        required: true,
        default: 'public'
    }
})


const User = mongoose.models.User || model('User', user)
const Post = mongoose.models.Post || model('Post', post)

export {
    User,
    Post
}