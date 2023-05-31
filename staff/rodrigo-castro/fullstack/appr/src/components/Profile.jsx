import { useState } from 'react'

import './Profile.css'

export default function Profile({ onChangeCity, onChangeEmail, onChangePassword, onChangeAvatar, user }) {
    const [mode, setMode] = useState(localStorage.mode ? localStorage.mode : 'light')

    const handleChangeCity = () => onChangeCity()
    
    const handleChangeEmail = () => onChangeEmail()

    const handleChangePassword = () => onChangePassword()

    const handleChangeAvatar = () => onChangeAvatar()

    const handleDeleteAccount = () => console.log('IMPLEMENT ME!!')

    const handleSwitchMode = () => {
        document.querySelector(':root').classList.toggle('dark')

        localStorage.mode = document.querySelector(':root').classList.contains('dark') ? 'dark' : 'light'

        setMode(localStorage.mode)
    }    
    
    return <section className='settings'>
        <div className="modal-profile-options">

            {user && <img src={user.avatar || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'} alt="" className="user-avatar-big" onClick={handleChangeAvatar} />}
            <ul className="profile-options">
                <li className={`mode ${mode}`}><button onClick={handleSwitchMode} className='mode-button'><span className="material-symbols-rounded icon-color">{(localStorage.mode === 'dark') ? 'nightlight' : 'light_mode'}</span></button></li>
                <li onClick={handleChangeCity} className='profile-button'>Change city</li>
                <li onClick={handleChangeEmail} className='profile-button'>Change email</li>
                <li onClick={handleChangePassword} className='profile-button'>Change password</li>
                <li onClick={handleDeleteAccount} className='profile-button'>Delete account</li>
            </ul>
            {/* <button className="submit-buttons close-profile-options" type="button" onClick={handleCancel}>Back</button> */}
        </div>
    </section>
}