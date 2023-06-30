const { extractUserId } = require('./helpers')
const { updateUserEmail } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { email, newEmail, password } = req.body

        updateUserEmail(userId, email, newEmail, password)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}