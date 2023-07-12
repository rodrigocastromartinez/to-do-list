const toggleLikePost = require('./toggleLikePost')

toggleLikePost('user-1', 'post-1', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post like toggled')
})