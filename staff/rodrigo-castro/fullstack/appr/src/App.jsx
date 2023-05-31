import { useState } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import { context } from './ui'
import Alert from './components/Alert.jsx'
import Context from './Context'
import Loader from './library/Loader'

export default function App() {
    const [view, setView] = useState(context.userId === undefined? 'login' : 'home')
    const [feedback, setFeedback] = useState(null)
    const [loader, setLoader] = useState(false)

    const handleGoToRegister = () => setView('register')

    const handleGoToLogin = () => setView('login')

    const handleGoToHome = () => setView('home')

    const handleAcceptAlert = () => setFeedback(null)

    const handleLogout = () => setView('login')

    const handleShowAlert = (message, level = 'warn') => setFeedback({message, level})

    const freeze = () => setLoader(true)

    const unfreeze = () => setLoader(false)

    if(!localStorage.mode)
        localStorage.mode = 'light'

    if(localStorage.mode === 'dark'){
        if(!document.querySelector('html').classList.contains('dark'))
            document.querySelector('html').classList.add('dark')
    } else {
        if(document.querySelector('html').classList.contains('dark'))   
            document.querySelector('html').classList.remove('dark')
    }

    return <Context.Provider value={{ alert: handleShowAlert, freeze, unfreeze }}>
        {view === 'login' && <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome}/>}
        {view === 'register' && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin}/>}
        {view === 'home' && <Home onLogout={handleLogout}/>}
        {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert}/>}
        {loader && <Loader />}
    </Context.Provider>
}