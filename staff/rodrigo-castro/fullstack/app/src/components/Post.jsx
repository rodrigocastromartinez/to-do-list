import { context } from "../ui"
import toggleLikePost from '../logic/toggleLikePost'
import toggleSavePost from '../logic/toggleSavePost'
import deletePost from "../logic/deletePost"
import PostMenu from "./PostMenu"
import './Post.css'
import { useState } from "react"
import togglePrivacy from "../logic/togglePrivacy"
import { useAppContext } from '../hooks'

export default function Post({ post: { id, image, text, date, likedBy, author: { id: authorId, name, avatar }, isFav, privacy }, onToggledLikePost, onEdit, onPostDeleted, onToggleSavePost, onToggledPrivacy }) {
    const { alert, freeze, unfreeze } = useAppContext()

    const [postOptions, setPostOptions] = useState(null)

    const newDate = new Date(date)
    const day = newDate.getDate().toString()
    const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][newDate.getMonth()]
    const year = newDate.getFullYear()

    const handleToggleLikePost = () => {
        try {
            freeze()

            toggleLikePost(context.userId, id, error => {
                unfreeze()

                if (error) {
                    alert(error.message)

                    return
                }

                onToggledLikePost()
            })
        } catch (error) {
            unfreeze()
            alert(error.message)
        }
    }

    const handleToggleSavePost = () => {
        try {
            freeze()

            toggleSavePost(context.userId, id, error => {
                unfreeze()

                if (error) {
                    alert(error.message)

                    return
                }

                onToggleSavePost()
            })

        } catch (error) {
            unfreeze()
            alert(error.message)
        }
    }

    const handlePostOptions = () => {
        setPostOptions('show')
    }

    const handleToggleHide = () => {
        try {
            freeze()

            togglePrivacy(context.userId, id, error => {
                unfreeze()

                if (error) {
                    alert(error.message)

                    return
                }

                setPostOptions(null)

                onToggledPrivacy()
            })
        } catch (error) {
            unfreeze()
            alert(error.message)
        }
    }

    const handleEdit = () => {
        setPostOptions(null)

        onEdit(id)
    }

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete?')) {
            try {
                freeze()
                deletePost(context.userId, id, error => {
                    unfreeze()

                    if (error) {
                        alert(error.message)

                        return
                    }

                    onPostDeleted()
                })
            } catch (error) {
                unfreeze()
                alert(error.message)
            }
        }
    }

    const handleMenuClosed = () => {
        setPostOptions(null)
    }

    console.debug('Post -> render')

    return <>
        {authorId && <><article className="post-container">

            <div className="post-header">
                <img src={avatar} className="user-avatar" />
                <p className="author-name">{name}</p>
                <time>· {day} {month} {year} ·</time>
                {authorId === context.userId && (privacy === 'public' ? <span className="material-symbols-rounded visibility">visibility</span> : <span className="material-symbols-rounded visibility">visibility_off</span>)}
                {authorId === context.userId ? <button className="post-options" onClick={handlePostOptions}><span className="material-symbols-rounded">expand_circle_down</span></button> : ''}
            </div>
            <img src={image} />
            <div className="post-options">
                <button className={`post-button ${likedBy && likedBy.includes(context.userId) ? 'liked filled' : ''}`} onClick={handleToggleLikePost}><span className="material-symbols-rounded">favorite</span></button>
                <button className={`post-button ${isFav ? 'filled' : ''}`} onClick={handleToggleSavePost}><span className="material-symbols-rounded">bookmark</span></button>
            </div>
            {likedBy.length > 0 ? <p className="likes-counter">{likedBy.length} {likedBy.length > 1 ? 'likes' : 'like'}</p> : ''}
            <div>
                <p className="author-name">{name}</p><p>{text}</p>
            </div>
            {postOptions === 'show' && <PostMenu
                options={[
                    { onClick: handleToggleHide, dropDownItemClass: 'dropdown-item', icon: privacy === 'public' ? 'visibility_off' : 'visibility', text: privacy === 'public' ? 'Hide' : 'Show', textClass: 'post-menu-text' },
                    { onClick: handleEdit, dropDownItemClass: 'dropdown-item', icon: 'edit', text: 'Edit', textClass: 'post-menu-text' },
                    { onClick: handleDelete, dropDownItemClass: 'dropdown-item', icon: 'delete', text: 'Delete', textClass: 'post-menu-text' }
                ]}
                onCloseMenu={handleMenuClosed}
            />}
        </article></>}
    </>
}