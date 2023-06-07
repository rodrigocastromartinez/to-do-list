const registerUser = require('./registerUser.js')

registerUser('pepito.grillo', 'pepito@grillo.com', '123123123', error => {
    if(error) {
        console.error(error)

        return
    }

    console.log('user registered')
})