const { retrievePosts } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')
const jwt = require('jsonwebtoken')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    return retrievePosts(userId)
        .then(posts => res.json(posts))
})