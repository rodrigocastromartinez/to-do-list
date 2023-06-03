import authenticateUser from '../logic/authenticateUser'
import { context } from '../ui'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import Context from "../Context"
import Container from '../library/Container'

export default function Login({onRegisterClick, onUserLoggedIn}) {
    const { alert, freeze, unfreeze } = useContext(Context)

    function handleRegisterClick(event) {
        event.preventDefault()
  
        onRegisterClick()
    }

    function handleLogin(event) {
        event.preventDefault()

        const email = event.target.email.value,
        password = event.target.password.value

        try{
            freeze()
            
            authenticateUser(email, password, (error, userId) => {
                unfreeze()

                if(error){
                    alert(error.message, 'error')

                    return
                }
                
                context.userId = userId
    
                onUserLoggedIn()
            })
        } catch(error){
            alert(error.message, 'warn')
        }
    }
  
    return <Container tag="div">
    <h1 className="title">LOGIN</h1>
    <form className="inputs" onSubmit={handleLogin}>
            <input className="input-field" type="email" name="email" placeholder="Email"/>
            <input className="input-field" type="password" name="password" placeholder="Password"/>
            <div className="remember-me">
                <input className="checkbox" type="checkbox" name="remember-me"/>
                <div className="remember-me-text">Remember me</div>
            </div>
            <div className="forgot-password">Forgot your <a className="link">password</a>?</div>
            <div className="already-registered">Dont have an account? <a className="link" onClick={handleRegisterClick}>Register now</a></div>
            <button className="submit-buttons" type="submit">Login</button>
    </form>
    </Container>
  }