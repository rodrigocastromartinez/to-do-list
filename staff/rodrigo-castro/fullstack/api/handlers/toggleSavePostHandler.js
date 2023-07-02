const { toggleSavePost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const { postId } = req.params

    const userId = extractUserId(req)

    return toggleSavePost(userId, postId)
        .then(() => res.status(201).send())
})