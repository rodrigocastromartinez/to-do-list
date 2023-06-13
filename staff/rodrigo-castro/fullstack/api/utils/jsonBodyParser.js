module.exports = (req, res, next) => {
    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {
        req.body = JSON.parse(json)

        next()
    })
}