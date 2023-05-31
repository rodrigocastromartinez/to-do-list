import BarActionIcon from "../library/BarActionIcon"
import './NavigationBar.css'

export default function NavigationBar({handleFilterAllPosts, handleOpenAddPost, handleOpenProfile, handleLogout, postsToShow, modal, user}) {
    return <>
        <header>
            <nav>
                <ul className="horizontal-menu">
                    <li className='logo'>
                        <div name="my-app" ><a href="#"><span className="material-symbols-rounded">emoticon</span></a></div>
                    </li>
                    <BarActionIcon 
                        iconClass={`menu-buttons material-symbols-rounded ${postsToShow === 'all' && modal === null ? 'filled' : ''}`} 
                        icon={'home'} 
                        textClass={'menu-text'} 
                        text ={postsToShow === 'all' && modal === null ? <b>Home</b> : 'Home'}
                        onClick={handleFilterAllPosts} 
                    />
                    <BarActionIcon 
                        iconClass={`menu-buttons material-symbols-rounded ${modal === 'add-post' ? 'filled' : ''}`} 
                        icon={'add_a_photo'} 
                        textClass={'menu-text'} 
                        text ={modal === 'add-post' ? <b>Post</b> : 'Post'}
                        onClick={handleOpenAddPost} 
                    />
                    {user && <>
                    <li className="profile" onClick={handleOpenProfile}>
                        <img src={user.avatar || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'} alt="" className={`user-avatar ${postsToShow !== 'all' && modal !== 'add-post' ? 'selected' : ''}`}/>
                        <a href="#" className="menu-buttons"><span className="menu-text" name="authenticated-user-name">{modal === 'profile' || postsToShow !== 'all' ? <b>Profile</b> : 'Profile'}</span></a>
                    </li>
                    </>}
                    
                    <BarActionIcon 
                        overallClass='logout'
                        iconClass={'menu-buttons material-symbols-rounded'} 
                        icon={'logout'} 
                        textClass={'menu-text'} 
                        text ={'Logout'}
                        onClick={handleLogout} 
                    />

                </ul>
            </nav>
        </header>
    </>
}