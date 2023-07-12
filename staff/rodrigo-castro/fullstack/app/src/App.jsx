import { useState } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Alert from './components/Alert.jsx'
import AppContext from './AppContext'
import Loader from './library/Loader'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import isUserLoggedIn from './logic/isUserLoggedIn'

const { Provider } = AppContext

export default function App() {
    const [feedback, setFeedback] = useState(null)
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    const handleAcceptAlert = () => setFeedback(null)

    const handleLogout = () => setView('login')

    const handleShowAlert = (message, level = 'warn') => setFeedback({ message, level })

    const freeze = () => setLoader(true)

    const unfreeze = () => setLoader(false)

    if (!localStorage.mode)
        localStorage.mode = 'light'

    if (localStorage.mode === 'dark') {
        if (!document.querySelector('html').classList.contains('dark'))
            document.querySelector('html').classList.add('dark')
    } else {
        if (document.querySelector('html').classList.contains('dark'))
            document.querySelector('html').classList.remove('dark')
    }

    return <Provider value={{ alert: handleShowAlert, freeze, unfreeze, navigate }}>
        <Routes>
            <Route path='/login' element={isUserLoggedIn() ? <Navigate to='/' /> : <Login />} />
            <Route path='/register' element={isUserLoggedIn() ? <Navigate to='/' /> : <Register />} />
            <Route path='/' element={isUserLoggedIn() ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
        </Routes>

        {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
        {loader && <Loader />}
    </Provider>
}