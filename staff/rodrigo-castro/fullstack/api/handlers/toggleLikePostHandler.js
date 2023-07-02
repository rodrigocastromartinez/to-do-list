const { extractUserId, handleErrors } = require('./helpers')
const { toggleLikePost } = require('../logic')

module.exports = handleErrors((req, res) => {
    const { postId } = req.params

    const userId = extractUserId(req)

    return toggleLikePost(userId, postId)
        .then(() => res.status(201).send())
})