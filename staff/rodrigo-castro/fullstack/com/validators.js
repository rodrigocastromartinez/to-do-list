console.debug('validators loaded')

// CREO QUE YA NO LO USO
// const checkNewUser = (userEmail, users) => {
//     const userFound = users().find(user => user.email === userEmail)
//     if(userFound) throw new Error('Email already registered', {cause: "ownError"})
// }

function validateEmail(email) {
    if (typeof email !== 'string') throw new Error('Email is not a string')
    if (!email.trim().length) throw new Error('Email is empty')
    if (!emailExpression.test(email)) throw new Error('Email format is wrong')
}

function validateUrl(avatarUrl, explain = 'url') {
    if (typeof avatarUrl !== 'string') throw new Error(`${explain} is not a string`)
    if (!avatarUrl.trim().length) throw new Error(`${explain} is empty`)
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new Error(`${explain} is not a string`)
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
    if (typeof postText !== 'string') throw new Error(`${explain} is not a string`)
    if (postText.trim().length < 1) throw new Error('Text is empty')
}

const userNameExpression = /^[a-z0-9._-]{3,30}$/
const emailExpression = /^[\w-.]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,4}){1,2}$/
const passwordExpression = /^[a-zA-Z\d#$@!%&*?]{8,16}/
// const passwordExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[a-zA-Z\d#$@!%&*?]{8,16}/

module.exports = { validateEmail, validateUrl, validateId, validateUserName, validatePassword, validateText }