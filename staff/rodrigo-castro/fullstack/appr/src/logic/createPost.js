import { validateId, validateUrl, validateText } from './helpers/validators'
import { savePosts, findUserById, loadPosts } from '../data'

export function createPost(userId, image, text, callback) {
    validateId(userId)
    validateUrl(image)
    validateText(text)

    findUserById(userId, user => {
        if(!user){
            callback(new Error(`User with id ${userId} not found`))
        }
    
        loadPosts(posts => {
            if(!posts){
                callback(new Error(`Posts not found`))

                return
            }

            let id = 'post-1'
            
            const lastPost = posts[posts.length - 1]
        
            if(lastPost)
                id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)
        
            const post = {
                id,
                author: userId,
                image,
                text,
                date: new Date,
                likedBy: []
            }
        
            posts.push(post)
        
            savePosts(posts, () => callback(null))
        })
    })
}