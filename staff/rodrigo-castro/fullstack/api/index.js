require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiHandler, registerUserHandler, authenticateUserHandler, createPostHandler, updateUserAvatarHandler, updateUserEmailHandler, updateUserPasswordHandler, editPostHandler, toggleLikePostHandler, togglePrivacyHandler, toggleSavePostHandler, deletePostHandler, retrieveUserHandler, retrievePostsHandler, retrievePostHandler, retrieveSavedPostsHandler } = require('./handlers')

const api = express()

api.use(cors)

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