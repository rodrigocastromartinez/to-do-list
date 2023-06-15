const { extractUserId } = require('../helpers')
const { updateUserEmail } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { email, newEmail, password } = req.body

        updateUserEmail(userId, email, newEmail, password, error => {
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