console.debug('data loaded')

const DELAY = 200

export function users2(callback) {
    setTimeout(() => {
        callback('usersJson' in localStorage? JSON.parse(localStorage.usersJson) : [])
    }, DELAY);
}

export const loadUsers = callback => setTimeout(() => {
    
    callback('usersJson' in localStorage? JSON.parse(localStorage.usersJson) : [])

}, DELAY)

export function saveUsers(users, callback) {
    setTimeout(() => {
        localStorage.usersJson = JSON.stringify(users)

        callback()
    }, DELAY)
}

export function saveUser(user, callback) {
    loadUsers(users => {
        const index = users.findIndex(_user => _user.id === user.id)
    
        if (index < 0)
            users.push(user)
        else
            users.splice(index, 1, user)
    
        saveUsers(users, callback)
    })
}

export const findUser = (userEmail, callback) => {
    loadUsers(users => {
        const user = users.find(user => user.email === userEmail)

        callback(user)
    })
}

export const findUserById = (userId, callback) => {
    loadUsers(users => {
        const user = users.find(user => user.id === userId)

        callback(user)
    })
}

// users.push({
//     id: 'user-1',
//     name: 'Wendy Darling',
//     email: 'wendy@darling.com',
//     password: '123123123'
// })

// users.push({
//     id: 'user-2',
//     name: 'Peter Pan',
//     email: 'peter@pan.com',
//     password: '123123123'
// })

// users.push({
//     id: 'user-3',
//     name: 'Pepito Grillo',
//     email: 'pepito@grillo.com',
//     password: '123123123'
// })

export const loadPosts = (callback) => {
    setTimeout(() => {
        const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []
    
        posts.forEach(post => post.date = new Date(post.date))
    
        callback(posts)
    }, DELAY)
}

export function savePosts(posts, callback) {
    setTimeout(() => {
        localStorage.postsJson = JSON.stringify(posts)

        callback()
    }, DELAY)
}

export function savePost(post, callback) {
    loadPosts(posts => {
        const index = posts.findIndex(_post => _post.id === post.id)
    
        if (index < 0)
            posts.push(post)
        else
            posts.splice(index, 1, post)
    
        savePosts(posts, callback)
    })

}

export const findPostById = (postId, callback) => {
    loadPosts(posts => {
        const post = posts.find(post => post.id === postId)

        callback(post)
    })
}

// posts.push({
//     id: 'post-1',
//     author: 'user-1',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/1200px-Smiley.svg.png',
//     text: 'Smile!',
//     date: new Date(2022, 11, 20, 22, 0, 5),
// })

// posts.push({
//     id: 'post-2',
//     author: 'user-1',
//     image: 'https://s1.abcstatics.com/media/play/2020/09/29/avatar-kE4H--1024x512@abc.jpeg',
//     text: 'I ❤️ Avatars!',
//     date: new Date(2023, 2, 11, 13, 11, 0),
// })

// posts.push({
//     id: 'post-3',
//     author: 'user-2',
//     image: 'https://s1.abcstatics.com/media/play/2020/09/29/avatar-kE4H--1024x512@abc.jpeg',
//     text: 'I ❤️ Avatars too!',
//     date: new Date(2023, 3, 1, 12, 32, 44),
// })