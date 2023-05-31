console.debug('validators loaded')

export const checkNewUser = (userEmail, users) => {
    const userFound = users().find(user => user.email === userEmail)
    if(userFound) throw new Error('Email already registered', {cause: "ownError"})
}

export function validateEmail(email) {
    if(typeof email !== 'string') throw new Error('Email is not a string', {cause: "ownError"})
    if(!email.trim().length) throw new Error ('Email is empty', {cause: "ownError"})
    if (!emailExpression.test(email)) throw new Error('Email format is wrong', {cause: "ownError"})
}

export function validateUrl(avatarUrl, explain = 'url'){
    if(typeof avatarUrl !== 'string') throw new Error(`${explain} is not a string`, {cause: "ownError"})
    if(!avatarUrl.trim().length) throw new Error(`${explain} is empty`, {cause: "ownError"})
}

export function validateId(id, explain = 'id'){
    if(typeof id !== 'string') throw new Error(`${explain} is not a string`, {cause: "ownError"})
    if(!id.trim().length) throw new Error(`${explain} is empty`, {cause: "ownError"})
}

export function validateName(userName){
    if (userName.trim().length < 1) throw new Error('Name is empty', {cause: "ownError"})
    if (!userNameExpression.test(userName)) throw new Error ('Username is not valid', {cause: "ownError"})
}

export function validatePassword(userPassword, message = 'password'){
    if (userPassword.length < 8) throw new Error(`${message} must have at least 8 characters`, {cause: "ownError"})
    if (!passwordExpression.test(userPassword)) throw new Error(`${message} format is not valid`, {cause: "ownError"})
}

export function validateText(postText, explain = 'text'){
    if(typeof postText !== 'string') throw new Error(`${explain} is not a string`, {cause: "ownError"})
    if (postText.trim().length < 1) throw new Error('Text is empty', {cause: "ownError"})
}

const userNameExpression = /^[a-z0-9._-]{3,16}$/
const emailExpression = /^[\w-.]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,4}){1,2}$/
const passwordExpression = /^[a-zA-Z\d#$@!%&*?]{8,16}/
// const passwordExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[a-zA-Z\d#$@!%&*?]{8,16}/