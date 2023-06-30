const { extractUserId } = require('./helpers')
const { updateUserAvatar } = require('../logic')


module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { avatar } = req.body

        updateUserAvatar(userId, avatar)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}