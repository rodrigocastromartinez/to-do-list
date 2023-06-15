const { extractUserId } = require('../helpers')
const { editPost } = require('../logic')

module.exports = (req, res) => {
    try {
        const { postId } = req.params

        const userId = extractUserId(req)

        const { image, text } = req.body

        editPost(userId, postId, image, text, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.send()
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}