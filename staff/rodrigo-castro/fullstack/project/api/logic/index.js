module.exports = {
    registerUser: require('./user/registerUser'),
    authenticateUser: require('./user/authenticateUser'),
    retrieveUser: require('./user/retrieveUser'),
    updateUserAvatar: require('./user/updateUserAvatar'),
    updateUserEmail: require('./user/updateUserEmail'),
    updateUserPassword: require('./user/updateUserPassword'),
    createPost: require('./post/createPost'),
    retrievePosts: require('./post/retrievePosts'),
    retrievePost: require('./post/retrievePost'),
    editPost: require('./post/editPost'),
    deletePost: require('./post/deletePost'),
    retrieveSavedPosts: require('./post/retrieveSavedPosts'),
    toggleLikePost: require('./post/toggleLikePost'),
    togglePrivacy: require('./post/togglePrivacy'),
    toggleSavePost: require('./post/toggleSavePost')
}