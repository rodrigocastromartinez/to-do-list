const { validateToken } = require('./validators')

function isTokenAlive(token) {
    const { iat, exp } = JSON.parse(atob(token.split('.')[1]))
    const now = Date.now() / 1000

    return exp - iat > now - iat
}

function isTokenValid(token) {
    try {
        validateToken(token)

        return true
    } catch (error) {
        return false
    }
}

module.exports = {
    isTokenAlive,
    isTokenValid
}