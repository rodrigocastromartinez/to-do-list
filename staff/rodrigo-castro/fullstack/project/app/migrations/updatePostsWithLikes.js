const posts = JSON.parse(localStorage.postsJson)

posts.forEach(post => {
    if(!post.likedBy)
        post.likedBy = []
})

localStorage.postsJson = JSON.stringify(posts)