import { validateId, validatePassword } from './helpers/validators'
import { saveUser, findUserById } from '../data'

export const changePassword = (userId, previousPassword, newPassword, newPasswordRepeated, callback) => {
    validateId(userId)
    validatePassword(previousPassword)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordRepeated, 'new password confirm')
    
    findUserById(userId, foundUser => {
        if(previousPassword !== foundUser.password){
            callback(new Error('Your password is incorrect', {cause: "ownError"}))

            return
        }
    
        if(newPassword === previousPassword){
            callback(new Error('New password must be different than previous', {cause: "ownError"}))
        }
    
        if(newPasswordRepeated !== newPassword){
            callback(new Error (`New passwords don't match`, {cause: "ownError"}))
        }

        foundUser.password = newPassword
        
        // changePasswordMenu.querySelector('.red-text').textContent = 'Password succesfully changed'
        // changePasswordMenu.querySelector('.red-text').classList.add('green-text')
        // changePasswordMenu.querySelector('form').reset()
    
        saveUser(foundUser, () => callback(null))
    })
}
