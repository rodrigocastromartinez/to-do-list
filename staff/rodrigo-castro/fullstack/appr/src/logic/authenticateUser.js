import { validateEmail, validatePassword } from './helpers/validators'
import { findUser } from '../data'

export default function authenticateUser(userEmail, userPassword, callback) {
    validateEmail(userEmail)
    validatePassword(userPassword)

    findUser(userEmail, foundUser => {
        if(foundUser === undefined || foundUser.password !== userPassword){
            callback(new Error('Wrong email or password', {cause: "ownError"}))

            return
        }
    
        callback(null, foundUser.id)
    })
    
}