const deletePost = require('./deletePost.js')

deletePost('user-1', 'post-1', error => {
    if(error) {
        console.error(error)

        return
    }

    console.log('post deleted')
})