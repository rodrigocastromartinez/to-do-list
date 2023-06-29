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

            retrievePosts(context.token, (error, posts) => {
                unfreeze()

                if (error) {
                    alert(error.message)

                    return
                }

                setPosts(posts)
            })

        } catch (error) {
            unfreeze()
            alert(error.message)
        }
    }, [])

    const handleRefreshPosts = () => {
        try {
            freeze()

            switch (postsToShow) {
                case 'all':
                    retrievePosts(context.token, (error, posts) => {
                        unfreeze()

                        if (error) {
                            alert(error.message)

                            return
                        }

                        setPosts(posts)
                    })
                    break;

                case 'saved':
                    retrievePosts(context.token, (error, posts) => {
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
                    retrievePosts(context.token, (error, posts) => {
                        unfreeze()

                        if (error) {
                            alert(error.message)

                            return
                        }

                        const _posts = posts.filter(post => post.author.authorId === context.token)

                        setPosts(_posts)
                    })
                    break;

                case 'liked':
                    retrievePosts(context.token, (error, posts) => {
                        unfreeze()

                        if (error) {
                            alert(error.message)

                            return
                        }

                        const _posts = posts.filter(post => post.likedBy.includes(context.token))

                        setPosts(_posts)
                    })
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

    // TODO EXTRAER EL USER ID PARA METERLO AQUI ABAJO, NO ESTA MAS EN EL CONTEXTO

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