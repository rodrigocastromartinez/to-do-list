const { extractUserId } = require('../helpers')
const { updateUserAvatar } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { avatar } = req.body

        updateUserAvatar(userId, avatar, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(204).send()
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}