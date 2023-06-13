require('dotenv').config()

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, updateUserAvatar, updateUserEmail, updateUserPassword, createPost, retrievePosts, retrievePost, editPost, deletePost, retrieveSavedPosts, toggleLikePost, togglePrivacy, toggleSavePost } = require('./logic')
const { extractUserId } = require('./helpers')
const { cors, jsonBodyParser } = require('./utils')

const api = express()

api.use(cors)

api.get('/', (req, res) => {
    res.send('Hello, API!')
})

api.post('/users', (req, res) => {
    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {
        try {
            const { name, email, password } = JSON.parse(json)

            registerUser(name, email, password, error => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                res.status(201).send()
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { email, password } = JSON.parse(json)

        authenticateUser(email, password, (error, userId) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(200).json({ userId })
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

api.post('/posts', jsonBodyParser, (req, res) => {
    try {
        const userId = extractUserId(req)

        const { image, text } = req.body

        createPost(userId, image, text, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.send()
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

api.patch('/users/avatar/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {
        try {
            const { userId } = req.params

            const { avatar } = JSON.parse(json)

            updateUserAvatar(userId, avatar, error => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                res.status(204).send()
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

api.patch('/users/email/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {
        try {
            const { userId } = req.params

            const { email, newEmail, password } = JSON.parse(json)

            updateUserEmail(userId, email, newEmail, password, error => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                res.send()
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

api.patch('/users/password/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params

            const { password, newPassword, newPasswordConfirm } = JSON.parse(json)

            updateUserPassword(userId, password, newPassword, newPasswordConfirm, error => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                res.status(204).send()
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

api.patch('/users/:userId/posts/:postId/edit', (req, res) => {
    const { userId, postId } = req.params

    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {
        try {
            const { image, text } = JSON.parse(json)

            editPost(userId, postId, image, text, error => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                res.send()
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

api.patch('/posts/like/:userId/:postId', (req, res) => {
    try {
        const { userId, postId } = req.params

        toggleLikePost(userId, postId, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

api.patch('/posts/privacy/:userId/:postId', (req, res) => {
    try {
        const { userId, postId } = req.params

        togglePrivacy(userId, postId, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

api.patch('/posts/save/:userId/:postId', (req, res) => {
    try {
        const { userId, postId } = req.params

        toggleSavePost(userId, postId, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

api.delete('/posts/:userId/:postId', (req, res) => {
    const { userId, postId } = req.params

    try {
        deletePost(userId, postId, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.send()
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

api.get('/users', (req, res) => {
    try {
        const userId = extractUserId(req)

        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.json(user)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

api.get('/posts/retrieveall/:userId', (req, res) => {
    try {
        const { userId } = req.params

        retrievePosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.json(posts)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

api.get('/posts/retrievepost/:userId/:postId', (req, res) => {
    try {
        const { userId, postId } = req.params

        retrievePost(userId, postId, (error, post) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.json(post)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

api.get('/posts/saved/:userId', (req, res) => {
    try {
        const { userId } = req.params

        retrieveSavedPosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.json(posts)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))