const togglePrivacy = require('./togglePrivacy')

togglePrivacy('user-1', 'post-1', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post privacy toggled')
})