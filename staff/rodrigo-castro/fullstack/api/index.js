const express = require('express')
const { registerUser, authenticateUser } = require('./logic')

const api = express()

api.get('/', (req, res) => {
    debugger
    res.send('Hello, World!')
})

api.get('/helloworld', (req, res) => res.json({ hello: 'world' }))

api.post('/users', (req, res) => {
    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {
        const { name, email, password } = JSON.parse(json)

        try {
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
    // TODO call authenticateUser and return userId
    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {
        const { email, password } = JSON.parse(json)

        try {
            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                res.status(201).send(userId) // ver si esto esta bien o se tiene que devolver de otra forma el userId
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

api.get('/users/:userId', (req, res) => {
    // TODO call retrieveUser and return user (in json)
})

api.listen(4000)