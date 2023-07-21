import retrievePosts from '../logic/retrievePosts'
import Post from './Post.jsx'
import { useState, useEffect } from 'react'
import './Posts.css'
import { useAppContext } from '../hooks'
import { utils } from 'com'
import extractUserId from '../logic/extractUserId'

const { extractSubFromToken } = utils

export default function Posts({ onEditClicked, onPostDeleted, postsToShow, lastPostsUpdate }) {
    const { freeze, unfreeze } = useAppContext()
    const [posts, setPosts] = useState()

    useEffect(() => {
        try {
            freeze()

            handleRefreshPosts()
        } catch (error) {
            unfreeze()
            alert(error.message)
        }
    }, [])

    const handleRefreshPosts = async () => {
        try {
            freeze()

            switch (postsToShow) {
                case 'all':
                    const posts = await retrievePosts()

                    unfreeze()

                    setPosts(posts.reverse())
                    break;

                case 'saved':
                    const savedPosts = await retrievePosts()
                        
                    unfreeze()

                    const _savedPosts = savedPosts.filter(post => post.isFav)

                    setPosts(_savedPosts.reverse())
                    break;

                case 'mine':
                    const myPosts = await retrievePosts()
                        
                    unfreeze()

                    const _userId = extractUserId()

                    const _myPosts = myPosts.filter(post => post.author.id === _userId)

                    setPosts(_myPosts.reverse())
                    break;

                case 'liked':
                    const likedPosts = await retrievePosts()
                    
                    unfreeze()

                    const userId_ = extractUserId()

                    const _likedPosts = likedPosts.filter(post => post.likedBy.includes(userId))

                    setPosts(_likedPosts.reverse())
                    break;
            }
        } catch (error) {
            unfreeze()
            alert(error.message)
        }
    }

    useEffect(() => {
        console.debug('Posts -> "componentDidMount" with hooks')

        return () => console.debug('Posts -> "componentWillUnmount" with hooks')
    })

    useEffect(() => {
        console.debug('Posts -> "componentWillRecieveProps" with hooks')

        if (lastPostsUpdate)
            handleRefreshPosts()
    }, [lastPostsUpdate])

    useEffect(() => {
        console.debug('Posts -> "componentWillRecieveProps" with hooks')

        handleRefreshPosts()
    }, [postsToShow])

    console.debug('Posts -> render')

    const userId = extractUserId()

    return <section className='posts-list'>
        {posts && posts.map(post => (post.privacy === 'public' || post.author.id === userId) && <Post
            key={post.id}
            post={post}
            onToggledLikePost={handleRefreshPosts}
            onToggleSavePost={handleRefreshPosts}
            onToggledPrivacy={handleRefreshPosts}
            onEdit={onEditClicked}
            onPostDeleted={onPostDeleted}
        />)}
    </section>
}