const editPost = require('./editPost')

editPost('user-1', 'post-1', 'https://img.freepik.com/free-photo/tropical-beach_74190-188.jpg?w=2000', 'edit post test', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post edited')
})