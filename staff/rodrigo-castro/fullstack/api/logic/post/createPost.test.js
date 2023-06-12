const createPost = require('./createPost')

createPost('user-1', 'https://cdn0.geoenciclopedia.com/es/posts/8/0/0/montanas_8_orig.jpg', 'create post test', error => {
    if(error) {
        console.error(error)

        return
    }

    console.log('post created')
})