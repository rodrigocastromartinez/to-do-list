const { retrievePost } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const { postId } = req.params

        const userId = extractUserId(req)

        retrievePost(userId, postId)
            .then((post) => res.json(post))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}