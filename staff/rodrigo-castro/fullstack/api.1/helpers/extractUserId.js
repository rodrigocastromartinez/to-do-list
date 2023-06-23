module.exports = req => {
    const { authorization } = req.headers
    const userId = authorization.slice(7)

    return userId
}