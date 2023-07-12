import { useState } from 'react'

export default function Profile({ onChangeEmail, onChangePassword, onChangeAvatar, user }) {
    const [mode, setMode] = useState(localStorage.mode ? localStorage.mode : 'light')

    const handleChangeEmail = () => onChangeEmail()

    const handleChangePassword = () => onChangePassword()

    const handleChangeAvatar = () => onChangeAvatar()

    const handleDeleteAccount = () => console.log('IMPLEMENT ME!!')

    const handleSwitchMode = () => {
        document.querySelector(':root').classList.toggle('dark')

        localStorage.mode = document.querySelector(':root').classList.contains('dark') ? 'dark' : 'light'

        setMode(localStorage.mode)
    }

    return <section className='w-screen h-custom absolute top-16 flex md:md-settings md-lg:lg-settings'>
        <div className="w-full flex flex-col justify-center items-center relative p-8">

            {user && <img src={user.avatar || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'} alt="" className="bg-transparent h-28 w-28 rounded-full mb-5 object-cover" onClick={handleChangeAvatar} />}
            <ul className="w-full h-fit list-none rounded-2xl flex flex-col items-center m-0 p-0 gap-5 text-lg font-normal cursor-pointer">
                <li className={`profile-li w-24 ${mode}`}><button onClick={handleSwitchMode} className='bg-[var(--white-000)] text-[var(--black-100)] flex items-center'><span className="material-symbols-rounded text-[var(--yellow)]">{(localStorage.mode === 'dark') ? 'nightlight' : 'light_mode'}</span></button></li>
                <li onClick={handleChangeEmail} className='profile-li profile-button'>Change email</li>
                <li onClick={handleChangePassword} className='profile-li profile-button'>Change password</li>
                <li onClick={handleDeleteAccount} className='profile-li profile-button'>Delete account</li>
            </ul>
            {/* <button className="submit-buttons close-profile-options" type="button" onClick={handleCancel}>Back</button> */}
        </div>
    </section>
}