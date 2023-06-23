const toggleSavePost = require('./toggleSavePost')

toggleSavePost('user-1', 'post-1', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post save toggled')
})