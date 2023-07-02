const { extractUserId, handleErrors } = require('./helpers')
const { editPost } = require('../logic')

module.exports = handleErrors((req, res) => {
    const { postId } = req.params

    const userId = extractUserId(req)

    const { image, text } = req.body

    return editPost(userId, postId, image, text)
        .then(() => res.send())
})