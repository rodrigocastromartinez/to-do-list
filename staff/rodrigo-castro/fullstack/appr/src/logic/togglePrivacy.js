import { findPostById, findUserById, savePost } from "../data";
import { validateId } from "./helpers/validators";

export default function togglePrivacy(userId, postId, callback) {
    validateId(userId)
    validateId(postId)

    findUserById(userId, user => {
        if(!user){
            callback(new Error(`User with id ${userId} not found`))

            return
        }
        
        findPostById(postId, post => {
            if(!post){
                callback(new Error(`Post with id ${postId} not found`))
    
                return
            }
    
            if(post.privacy === 'public'){
                post.privacy = 'privated'

                savePost(post, () => callback(null))
            } else{
                post.privacy = 'public'

                savePost(post, () => callback(null))
            }
        })
    })
}