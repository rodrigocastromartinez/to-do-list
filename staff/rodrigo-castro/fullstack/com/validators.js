console.debug('validators loaded')

function validateEmail(email) {
    if (typeof email !== 'string') throw new TypeError('Email is not a string')
    if (!email.trim().length) throw new Error('Email is empty')
    if (!emailExpression.test(email)) throw new Error('Email format is wrong')
}

function validateUrl(avatarUrl, explain = 'url') {
    if (typeof avatarUrl !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!avatarUrl.trim().length) throw new Error(`${explain} is empty`)
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string - ${id}`)
    if (!id.trim().length) throw new Error(`${explain} is empty`)
}

function validateUserName(userName) {
    if (userName.trim().length < 1) throw new Error('Name is empty')
    if (!userNameExpression.test(userName)) throw new Error('Username is not valid')
}

function validatePassword(userPassword, message = 'password') {
    if (userPassword.length < 8) throw new Error(`${message} must have at least 8 characters`)
    if (!passwordExpression.test(userPassword)) throw new Error(`${message} format is not valid`)
}

function validateText(postText, explain = 'text') {
    if (typeof postText !== 'string') throw new TypeError(`${explain} is not a string`)
    if (postText.trim().length < 1) throw new Error('Text is empty')
}

function validateToken(token, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)
    if (token.split('.').length !== 3) throw new Error(`${explain} is not valid`)
}

const userNameExpression = /^[a-z0-9._-]{3,30}$/
const emailExpression = /^[\w-.]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,4}){1,2}$/
const passwordExpression = /^[a-zA-Z\d#$@!%&*?]{8,32}/
// const tokenExpression = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
// const passwordExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[a-zA-Z\d#$@!%&*?]{8,16}/

module.exports = { validateEmail, validateUrl, validateId, validateUserName, validatePassword, validateText, validateToken }