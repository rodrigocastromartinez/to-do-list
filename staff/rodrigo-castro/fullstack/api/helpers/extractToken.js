module.exports = req => {
    const { authorization } = req.headers
    const token = authorization.slice(7)

    return token
}