const { extractToken } = require('../helpers')
const { toggleLikePost } = require('../logic')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    try {
        const { postId } = req.params

        const token = extractToken(req)

        const payload = jwt.verify(token, process.env.SECRET)

        const { sub: userId } = payload

        toggleLikePost(userId, postId)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}