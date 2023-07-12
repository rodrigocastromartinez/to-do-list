const context = require('../../context')

module.exports = () => {
    const { users, posts } = context

    return Promise.all([
        users.deleteMany(),
        posts.deleteMany()
    ])
}