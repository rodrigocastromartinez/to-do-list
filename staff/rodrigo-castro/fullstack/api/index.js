require('dotenv').config()

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, updateUserAvatar, updateUserEmail, updateUserPassword, createPost, retrievePosts, retrievePost, editPost, deletePost, retrieveSavedPosts, toggleLikePost } = require('./logic')

const api = express()

api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    next()
})

api.get('/', (req, res) => {

    res.send('Hello, World!')
})

api.get('/helloworld', (req, res) => res.json({ hello: 'world' }))

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

api.post('/users/auth', (req, res) => {
    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {
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
})

api.post('/posts/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {
        try {
            const { userId } = req.params

            const { image, text } = JSON.parse(json)

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

api.patch('/posts/:userId/:postId', (req, res) => {
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

api.get('/users/:userId', (req, res) => {
    try {
        // const userId = req.params.userId
        const { userId } = req.params

        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.json(user) // el 200 que poníamos antes en realidad no hace falta porque ya devuelve eso por defecto
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

api.get('/posts/:userId', (req, res) => {
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

api.get('/posts/:userId/:postId', (req, res) => {
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

api.get('/posts/:userId', (req, res) => {
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