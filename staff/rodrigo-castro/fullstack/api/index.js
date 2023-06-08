const express = require('express')
const updateUserPassword = require('./logic/updateUserPassword')

const api = express()

api.get('/helloworld', (req, res) => res.json({ hello: 'world' }))

api.patch('/users/password/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { id, password, newPassword, newPasswordConfirm } = JSON.parse(json)

            updateUserPassword(id, password, newPassword, newPasswordConfirm, error => {
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

api.listen(4000)