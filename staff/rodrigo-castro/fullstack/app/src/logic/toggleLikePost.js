import { validateId } from './helpers/validators'
import { savePost, findPostById, findUserById } from "../data"

export default (userId, postId, callback) => {    
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    findUserById(userId, user => {
        if(!user){
            callback(new Error (`User id ${userId} not found`))

            return
        } 
    
        findPostById(postId, post => {
            if(!post){
                callback(new Error (`Post id ${postId} not found`))

                return
            }
        
            const index = post.likedBy.indexOf(userId)
    
            if(index < 0)
                post.likedBy.push(userId)
            else{
                post.likedBy.splice(index, 1)
            }
            
            savePost(post, () => callback(null))
        })
    })
}