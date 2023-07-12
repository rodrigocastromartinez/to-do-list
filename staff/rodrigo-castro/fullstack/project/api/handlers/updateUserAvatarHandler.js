const { extractUserId, handleErrors } = require('./helpers')
const { updateUserAvatar } = require('../logic')


module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { avatar } = req.body

    return updateUserAvatar(userId, avatar)
        .then(() => res.status(204).send())
})