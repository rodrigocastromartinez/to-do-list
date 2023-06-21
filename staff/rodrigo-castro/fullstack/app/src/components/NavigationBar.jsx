import BarActionIcon from "../library/BarActionIcon"
import './NavigationBar.css'

export default function NavigationBar({handleFilterAllPosts, handleOpenAddPost, handleOpenProfile, handleLogout, postsToShow, modal, user}) {
    return <>
        <header className="md:md-header max-[1000px]:md-header md-lg:lg-header">
            <nav className="h-full w-full">
                <ul className="horizontal-menu md:flex md:flex-col">
                    <li className="h-fit text-[var(--black-100)] text-2xl cursor-pointer flex justify-center self-center md:flex md-lg:md-lg-li">
                        <div className="w-full flex justify-center" name="my-app" ><a href="#" className="w-full text-[var(--black-100)]"><span className="flex justify-center material-symbols-rounded">emoticon</span></a></div>
                    </li>
                    <BarActionIcon 
                        overallClass='flex align-center md-lg:md-lg-li'
                        iconClass={`menu-buttons material-symbols-rounded ${postsToShow === 'all' && modal === null ? 'filled' : ''}`} 
                        icon={'home'} 
                        textClass={'hidden md-lg:menu-text'} 
                        text ={postsToShow === 'all' && modal === null ? <b>Home</b> : 'Home'}
                        onClick={handleFilterAllPosts} 
                    />
                    <BarActionIcon 
                        overallClass='flex align-center md-lg:md-lg-li'
                        iconClass={`menu-buttons material-symbols-rounded ${modal === 'add-post' ? 'filled' : ''}`} 
                        icon={'add_a_photo'} 
                        textClass={'hidden md-lg:menu-text'} 
                        text ={modal === 'add-post' ? <b>Post</b> : 'Post'}
                        onClick={handleOpenAddPost} 
                    />
                    {user && <>
                    <li className="profile md-lg:md-lg-li" onClick={handleOpenProfile}>
                        <img src={user.avatar || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'} alt="" className={`user-avatar ${postsToShow !== 'all' && modal !== 'add-post' ? 'selected' : ''}`}/>
                        <a href="#" className="menu-buttons md-lg:h-fit"><span className="hidden md-lg:menu-text" name="authenticated-user-name">{modal === 'profile' || postsToShow !== 'all' ? <b>Profile</b> : 'Profile'}</span></a>
                    </li>
                    </>}
                    
                    <BarActionIcon 
                        overallClass='flex align-center md:mt-auto md:mb-4 md-lg:md-lg-li'
                        iconClass={'menu-buttons material-symbols-rounded'} 
                        icon={'logout'} 
                        textClass={'hidden md-lg:menu-text'} 
                        text ={'Logout'}
                        onClick={handleLogout} 
                    />

                </ul>
            </nav>
        </header>
    </>
}