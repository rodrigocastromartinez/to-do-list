const { retrievePost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const { postId } = req.params

    const userId = extractUserId(req)

    return retrievePost(userId, postId)
        .then((post) => res.json(post))
})