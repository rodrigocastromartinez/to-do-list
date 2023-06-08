import Posts from '../components/Posts'
import { retrieveUser } from '../logic/retrieveUser'
import retrieveWeather from '../logic/retrieveWeather'
import WeatherData from '../components/WeatherData'
import { context } from '../ui'
import { useState, useEffect } from 'react'
import AddPostModal from '../components/AddPostModal'
import ChangeCity from '../components/ChangeCity'
import ChangeEmail from '../components/ChangeEmail'
import ChangePassword from '../components/ChagePassword'
import ChangeAvatar from '../components/ChangeAvatar'
import EditPost from '../components/EditPost'
import Profile from '../components/Profile'
import './Home.css'
import ProfileBar from '../components/ProfileBar'
import NavigationBar from '../components/NavigationBar'
import { useAppContext } from '../hooks'

export default function Home(props) {
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(Date.now())
    const [postsToShow, setPostsToShow] = useState('all')
    const [user, setUser] = useState()
    const [view, setView] = useState('posts')
    const [summary, setSummary] = useState()

    const { freeze, unfreeze } = useAppContext()

    useEffect(() => {
        try {
            freeze()

            retrieveUser(context.userId, (error, user) => {
                unfreeze()

                if (error) {
                    alert(error.message)

                    return
                }

                setUser(user)

                if (user.city)
                    retrieveWeather(user.city, (error, summary) => {
                        unfreeze()

                        if (error) {
                            alert(error.message)

                            return
                        }

                        setSummary(summary)
                    })
            })

            freeze()

        } catch (error) {
            alert(error.message)
        }
    }, [])


    const handleCloseModal = () => setModal(null)

    const handleOpenAddPost = () => setModal('add-post')

    const handlePostsModified = () => {
        setModal(null)

        setLastPostsUpdate(Date.now)
    }

    const handleOpenProfile = () => {
        setView('posts')

        setPostsToShow('mine')
    }

    const handleFilterSavedPosts = () => {
        setView('posts')

        setPostsToShow('saved')
    }

    const handleFilterAllPosts = () => {
        setView('posts')

        setPostsToShow('all')
    }

    const handleFilterMyPosts = () => {
        setView('posts')

        setPostsToShow('mine')
    }

    const handleFilterLikedPosts = () => {
        setView('posts')

        setPostsToShow('liked')
    }

    const handleOpenSettings = () => {
        setPostsToShow(null)

        setView('settings')
    }

    const handleOpenChangeCity = () => setModal('change-city')

    const handleOpenChangeEmail = () => setModal('change-email')

    const handleOpenChangePassword = () => setModal('change-password')

    const handleOpenChangeAvatar = () => setModal('change-avatar')

    const handleAvatarChanged = () => {
        try {
            freeze()

            retrieveUser(context.userId, (error, user) => {
                unfreeze()

                if (error) {
                    alert(error.message)
                }

                setModal(null)

                setUser(user)

                setLastPostsUpdate(Date.now())
            })

        } catch (error) {
            alert(error.message)
        }
    }

    const handleEditClicked = (id) => {
        setModal('edit-post')

        setPostId(id)
    }

    const handleLogout = (event) => {
        event.preventDefault()

        delete context.userId

        props.onLogout()
    }

    return <div className="home-page">
        <NavigationBar
            user={user}
            postsToShow={postsToShow}
            handleFilterAllPosts={handleFilterAllPosts}
            handleOpenAddPost={handleOpenAddPost}
            handleOpenProfile={handleOpenProfile}
            handleLogout={handleLogout}
            modal={modal}
        />

        {view === 'posts' && <main className="main-content">
            {postsToShow === 'all' && summary && <WeatherData city={user.city} summary={summary} className={"weather"} />}

            <Posts
                onEditClicked={handleEditClicked}
                lastPostsUpdate={lastPostsUpdate}
                postsToShow={postsToShow}
                user={user}
                onPostDeleted={handlePostsModified}
            />

            {modal === 'edit-post' && <EditPost
                onCancel={handleCloseModal}
                onPostEdited={handlePostsModified}
                postId={postId}
            />}
        </main>}

        {view === 'settings' && <Profile
            onChangeCity={handleOpenChangeCity}
            onChangeEmail={handleOpenChangeEmail}
            onChangePassword={handleOpenChangePassword}
            onChangeAvatar={handleOpenChangeAvatar}
            user={user}
        />}

        {modal === 'add-post' && <AddPostModal
            onCancel={handleCloseModal}
            onPostCreated={handlePostsModified}
        />}

        {modal === 'change-city' && <ChangeCity
            onCancel={handleCloseModal}
            onCityChanged={handleCloseModal}
        />}

        {modal === 'change-email' && <ChangeEmail
            onCancel={handleCloseModal}
            onEmailChanged={handleCloseModal}
        />}

        {modal === 'change-password' && <ChangePassword
            onCancel={handleCloseModal}
            onPasswordChanged={handleCloseModal}
        />}

        {modal === 'change-avatar' && <ChangeAvatar
            onCancel={handleCloseModal}
            onAvatarChanged={handleAvatarChanged}
        />}

        {postsToShow !== 'all' && <ProfileBar
            postsToShow={postsToShow}
            view={view}
            handleFilterMyPosts={handleFilterMyPosts}
            handleFilterSavedPosts={handleFilterSavedPosts}
            handleFilterLikedPosts={handleFilterLikedPosts}
            handleOpenSettings={handleOpenSettings}
            modal={modal}
        />}

    </div>
}