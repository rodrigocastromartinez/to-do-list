const { validateToken } = require('./validators')

function extractPayload(token) {
    return JSON.parse(atob(token.split('.')[1]))
}

function isTokenAlive(token) {
    const { iat, exp } = extractPayload(token)
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

function extractSubFromToken(token) {
    const { sub } = extractPayload(token)

    return sub
}

module.exports = {
    isTokenAlive,
    isTokenValid,
    extractSubFromToken
}