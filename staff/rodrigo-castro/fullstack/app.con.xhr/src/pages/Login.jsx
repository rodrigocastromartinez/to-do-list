import loginUser from '../logic/loginUser'
import { useAppContext } from '../hooks'
import Container from '../library/Container'
import { Link } from 'react-router-dom'

export default function Login() {
    const { alert, freeze, unfreeze, navigate } = useAppContext()

    function handleLogin(event) {
        event.preventDefault()

        const email = event.target.email.value,
            password = event.target.password.value

        try {
            freeze()

            loginUser(email, password)
                .then(() => {
                    unfreeze()

                    navigate('/')
                })
        } catch (error) {
            unfreeze()
            alert(error.message, 'warn')
        }
    }

    return <Container tag="div">
        <h1 className="title">LOGIN</h1>
        <form className="inputs" onSubmit={handleLogin}>
            <input className="input-field" type="email" name="email" placeholder="Email" />
            <input className="input-field" type="password" name="password" placeholder="Password" />
            <div className="flex items-center gap-0.5">
                <input className="h-4 w-4" type="checkbox" name="remember-me" />
                <div>Remember me</div>
            </div>
            <div>Forgot your <a className="link">password</a>?</div>
            <div>Dont have an account? <Link to='/register' className='link'>Register now</Link></div>
            <button className="submit-buttons" type="submit">Login</button>
        </form>
    </Container>
}