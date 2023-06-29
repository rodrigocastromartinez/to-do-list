require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { helloApiHandler,
    registerUserHandler,
    authenticateUserHandler,
    createPostHandler,
    updateUserAvatarHandler,
    updateUserEmailHandler,
    updateUserPasswordHandler,
    editPostHandler,
    toggleLikePostHandler,
    togglePrivacyHandler,
    toggleSavePostHandler,
    deletePostHandler,
    retrieveUserHandler,
    retrievePostsHandler,
    retrievePostHandler,
    retrieveSavedPostsHandler
} = require('./handlers')
const { MongoClient } = require('mongodb')
const context = require('./logic/context')

const client = new MongoClient(process.env.MONGODB_URL)

client.connect()
    .then(connection => {
        context.users = connection.db().collection('users')
        context.posts = connection.db().collection('posts')

        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.get('/', helloApiHandler)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.post('/posts', jsonBodyParser, createPostHandler)

        api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

        api.patch('/users/email', jsonBodyParser, updateUserEmailHandler)

        api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

        api.patch('/users/posts/:postId/edit', jsonBodyParser, editPostHandler)

        api.patch('/posts/:postId/like', toggleLikePostHandler)

        api.patch('/posts/:postId/privacy', togglePrivacyHandler)

        api.patch('/posts/save/:postId', toggleSavePostHandler)

        api.delete('/posts/:postId', deletePostHandler)

        api.get('/users/retrieveuser', retrieveUserHandler)

        api.get('/posts/retrieveall', retrievePostsHandler)

        api.get('/posts/:postId/retrievepost', retrievePostHandler)

        api.get('/posts/saved', retrieveSavedPostsHandler)

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)