const { deletePost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const { postId } = req.params

    const userId = extractUserId(req)

    return deletePost(userId, postId)
        .then(() => res.send())
})