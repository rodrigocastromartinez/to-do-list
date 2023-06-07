const retrieveUser = require('./retrieveUser.js')

retrieveUser('user-1', (error, user) => {
    if(error){
        console.log(error)

        return
    }

    console.log(user)
})