console.debug('validators loaded')
const { ContentError } = require('./errors')

function validateEmail(email) {
    if (typeof email !== 'string') throw new TypeError('Email is not a string')
    if (!email.trim().length) throw new ContentError('Email is empty')
    if (!emailExpression.test(email)) throw new ContentError('Email format is not valid')
}

function validateUrl(avatarUrl, explain = 'url') {
    if (typeof avatarUrl !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!avatarUrl.trim().length) throw new ContentError(`${explain} is empty`)
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string - ${id}`)
    if (!id.trim().length) throw new ContentError(`${explain} is empty`)
}

function validateUserName(userName) {
    if (userName.trim().length < 1) throw new ContentError('Name is empty')
    if (!userNameExpression.test(userName)) throw new ContentError('Username is not valid')
}

function validatePassword(userPassword, message = 'password') {
    if (userPassword.length < 8) throw new RangeError(`${message} must have at least 8 characters`)
    if (!passwordExpression.test(userPassword)) throw new ContentError(`${message} format is not valid`)
}

function validateText(postText, explain = 'text') {
    if (typeof postText !== 'string') throw new TypeError(`${explain} is not a string`)
    if (postText.trim().length < 1) throw new ContentError('Text is empty')
}

function validateToken(token, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)
    if (token.split('.').length !== 3) throw new ContentError(`${explain} is not valid`)
}

const userNameExpression = /^[a-z0-9._-]{3,30}$/
const emailExpression = /^[\w-.]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,4}){1,2}$/
const passwordExpression = /^[a-zA-Z\d#$@!%&*?]{8,32}/
// const tokenExpression = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
// const passwordExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[a-zA-Z\d#$@!%&*?]{8,16}/

module.exports = { validateEmail, validateUrl, validateId, validateUserName, validatePassword, validateText, validateToken }