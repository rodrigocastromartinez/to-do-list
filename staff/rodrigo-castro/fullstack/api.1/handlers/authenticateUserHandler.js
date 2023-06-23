const { authenticateUser } = require('../logic')

module.exports = (req, res) => {
    try {
        const { email, password } = req.body

        authenticateUser(email, password)
            .then(userId => res.status(200).json(userId))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}