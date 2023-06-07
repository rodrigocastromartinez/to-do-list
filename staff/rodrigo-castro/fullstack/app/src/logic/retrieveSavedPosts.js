import { validateId } from './helpers/validators'
import { loadPosts, loadUsers } from '../data'

export default function retrieveSavedPosts(userId, callback) {
    validateId(userId, 'user id')

    loadUsers(users => {
        const found = users.find(user => user.id === userId)
    
        if(!found){
            callback(new Error ('User id not valid'))

            return
        } 

        loadPosts(posts => {
            if(!posts){
                callback(new Error('Posts not found'))

                return
            }

            callback(null, posts.filter(post => found.savedPosts.includes(post.id)).toReversed())
        })
    })
}