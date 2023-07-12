import registerUser from '../logic/registerUser'
import Container from '../library/Container'
import { useAppContext } from '../hooks'
import { Link } from 'react-router-dom'

export default function Register() {
    const { freeze, unfreeze, navigate } = useAppContext()

    function handleRegister(event) {
        event.preventDefault()

        const email = event.target.email.value
        const username = event.target.name.value
        const password = event.target.password.value

        try {
            freeze()
            registerUser(email, username, password)
                .then(() => {
                    unfreeze()

                    navigate('/login')
                })
                .catch(error => alert(error.message))
        } catch (error) {
            unfreeze()
            alert(error.message)
        }
    }

    return <Container tag="div">
        <h1 className="title">REGISTER</h1>
        <form className="inputs" onSubmit={handleRegister}>
            <input className="input-field" type="text" name="name" placeholder="User name" />
            <input className="input-field" type="email" name="email" placeholder="Email" />
            <input className="input-field" type="password" name="password" placeholder="Password" />
            <div className="secondary-text">Already registered? <Link to='/login' className='link'>Sign in</Link></div>
            <button className="submit-buttons" type="submit">Register</button>
        </form>
    </Container>
}