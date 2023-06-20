import registerUser from '../logic/registerUser'
import Container from '../library/Container'
import { useAppContext } from '../hooks'

export default function Register({ onLoginClick, onUserRegistered }) {
    const { freeze, unfreeze } = useAppContext()

    function handleLoginClick(event) {
        event.preventDefault()

        onLoginClick()
    }

    function handleRegister(event) {
        event.preventDefault()

        const email = event.target.email.value
        const username = event.target.name.value
        const password = event.target.password.value

        try {
            freeze()

            registerUser(email, username, password, error => {
                unfreeze()

                if (error) {
                    alert(error.message)
                }

                document.querySelector('form').reset()
                onUserRegistered()
            })
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
            <div className="secondary-text">Already registered? <a className="link" onClick={handleLoginClick}>Sign in</a></div>
            <button className="submit-buttons" type="submit">Register</button>
        </form>
    </Container>
}