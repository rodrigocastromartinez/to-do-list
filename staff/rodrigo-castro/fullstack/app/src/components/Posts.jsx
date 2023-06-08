import retrievePosts from '../logic/retrievePosts'
import { context } from '../ui'
import Post from './Post.jsx'
import { useState, useEffect } from 'react'
import './Posts.css'
import { useAppContext } from '../hooks'

export default function Posts({ onEditClicked, onPostDeleted, postsToShow, lastPostsUpdate, user }) {
    const { freeze, unfreeze } = useAppContext()
    const [posts, setPosts] = useState()

    useEffect(() => {
        try {
            freeze()

            retrievePosts(context.userId, (error, posts) => {
                unfreeze()

                if (error) {
                    alert(error.message)

                    return
                }

                setPosts(posts)
            })

        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleRefreshPosts = () => {
        try {
            freeze()

            switch (postsToShow) {
                case 'all':
                    retrievePosts(context.userId, (error, posts) => {
                        unfreeze()

                        if (error) {
                            alert(error.message)

                            return
                        }

                        setPosts(posts)
                    })
                    break;

                case 'saved':
                    retrievePosts(context.userId, (error, posts) => {
                        unfreeze()

                        if (error) {
                            alert(error.message)

                            return
                        }

                        const _posts = posts.filter(post => post.isFav)

                        setPosts(_posts)
                    })
                    break;

                case 'mine':
                    retrievePosts(context.userId, (error, posts) => {
                        unfreeze()

                        if (error) {
                            alert(error.message)

                            return
                        }

                        const _posts = posts.filter(post => post.author.authorId === context.userId)

                        setPosts(_posts)
                    })
                    break;

                case 'liked':
                    retrievePosts(context.userId, (error, posts) => {
                        unfreeze()

                        if (error) {
                            alert(error.message)

                            return
                        }

                        const _posts = posts.filter(post => post.likedBy.includes(context.userId))

                        setPosts(_posts)
                    })
            }
        } catch (error) {
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

    return <section className='posts-list'>
        {posts && posts.map(post => (post.privacy === 'public' || post.author.authorId === context.userId) && <Post
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