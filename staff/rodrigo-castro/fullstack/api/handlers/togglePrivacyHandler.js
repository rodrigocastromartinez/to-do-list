const { togglePrivacy } = require('../logic')
const { extractUserId } = require('./helpers')

module.exports = (req, res) => {
    try {
        const { postId } = req.params

        const userId = extractUserId(req)

        togglePrivacy(userId, postId)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}