// import { validateId } from './helpers/validators'
import { loadPosts, findUserById, loadUsers } from '../data'
import { validators } from 'com'

const { validateId } = validators

export default function retrievePosts(userId, callback) {
    validateId(userId, 'user id')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`User with id ${user.id} not found`))

            return
        }

        loadPosts(posts => {
            loadUsers(users => {
                posts.forEach(post => {
                    const author = users.find(user => user.id === post.author)

                    post.author = {
                        authorId: author.id,
                        name: author.name,
                        avatar: author.avatar
                    }

                    post.isFav = user.savedPosts.includes(post.id)
                })

                callback(null, posts.toReversed())
            })
        })
    })
}