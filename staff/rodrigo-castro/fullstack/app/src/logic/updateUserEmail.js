import { validateEmail, validateId, validatePassword } from './helpers/validators'
import { loadUsers, saveUser, findUserById } from '../data'

export const changeEmail = (userId, userPreviousEmail, userNewEmail, userPassword, callback) => {
    validateId(userId)
    validateEmail(userPreviousEmail)
    validateEmail(userNewEmail)
    validatePassword(userPassword)
    
    findUserById(userId, (foundUser) => {
        if(userPreviousEmail !== foundUser.email){
            alert(new Error('Email or password incorrect', {cause: "ownError"}))

            return
        }

        loadUsers(users => {
            if(users.some(user => user.email === userNewEmail)){
                alert(new Error('Email already registered', {cause: "ownError"}))

                return
            }

            if(userPassword !== foundUser.password){
                alert(new Error('Email or password incorrect2', {cause: "ownError"}))
            }
        
            foundUser.email = userNewEmail
            // changeEmailMenu.querySelector('.red-text').textContent = 'Email succesfully changed'
            // changeEmailMenu.querySelector('.red-text').classList.add('green-text')
            // changeEmailMenu.querySelector('form').reset()
        
            saveUser(foundUser, () => callback(null))
        })
    })
}