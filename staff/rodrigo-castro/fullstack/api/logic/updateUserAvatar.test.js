const updateUserAvatar = require('./updateUserAvatar.js')

updateUserAvatar('user-1', 'www.hola.com', (error, user) => {
    if(error){
        console.log(error)

        return
    }

    console.log(user)
})