import { validateId } from "./helpers/validators"
import { loadPosts, savePosts, findUserById, findPostById } from "../data"

export default function deletePost(userId, postId, callback) {
    validateId(userId)
    validateId(postId)

    findUserById(userId, foundUser => {
        if(!foundUser){
            callback(new Error('User id not valid'))
        }
    
        findPostById(postId, foundPost => {
            if(!foundPost){
                callback(new Error('Post id not valid'))

                return
            }
        
            if(!foundUser.id === foundPost.author){
                callback(new Error(`Post doesn't belong to this user`))
            }

            loadPosts(posts => {
                if(!posts){
                    callback('Posts not found') //VERIFICAR SI ESTO HAY QUE HACERLO O NO

                    return
                }

                const index = posts.findIndex(post => post.id === postId)
            
                posts.splice(index, 1)
            
                savePosts(posts, () => callback(null))
            })
        

        })
    

    })

}