const users = JSON.parse(localStorage.usersJson)

users.forEach(user => {
    if(!user.savedPosts)
        user.savedPosts = []
})

localStorage.usersJson = JSON.stringify(users)