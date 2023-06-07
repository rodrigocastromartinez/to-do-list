import BarActionIcon from "../library/BarActionIcon";

export default function ProfileBar ({ postsToShow, handleFilterMyPosts, handleFilterSavedPosts, handleFilterLikedPosts, handleOpenSettings, view, modal}) {
    return <> 
    <footer>
        <ul className='profile-filters'>
            <BarActionIcon 
                iconClass={`menu-buttons material-symbols-rounded ${!modal && postsToShow === 'mine' ? 'filled' : ''}`} 
                icon={'photo_library'}
                onClick={handleFilterMyPosts} 
            />
            <BarActionIcon 
                iconClass={`menu-buttons material-symbols-rounded ${!modal && postsToShow === 'saved' ? 'filled' : '' }`}
                icon={'bookmark'}
                onClick={handleFilterSavedPosts}
            />
            <BarActionIcon 
                iconClass={`menu-buttons material-symbols-rounded ${!modal && postsToShow === 'liked' ? 'filled' : ''}`}
                icon={'favorite'}
                onClick={handleFilterLikedPosts}
            />
            <BarActionIcon 
                iconClass={`menu-buttons material-symbols-rounded ${view === 'settings' ? 'filled' : ''}`}
                icon={'settings'}
                onClick={handleOpenSettings}
            />
        </ul>
    </footer> </>
}