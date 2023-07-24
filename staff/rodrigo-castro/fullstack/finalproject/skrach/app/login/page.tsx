import { Roboto } from 'next/font/google'
import Link from 'next/link'

const roboto = Roboto({ subsets: ['latin'], weight: ['300'] })

export default function Login() {

    return <div className="flex min-h-screen min-w-screen flex-col justify-center items-center gap-4">
    <h1 className="text-4xl font-semibold">Login</h1>
    <form className="flex flex-col gap-4 items-center w-4/5">
        <input className={`input ${roboto.className}`} type="email" name="email" placeholder="Email" />
        <input className={`input ${roboto.className}`} type="password" name="password" placeholder="Password" />
        <div className="flex items-center gap-0.5">
            <input className="h-4 w-4" type="checkbox" name="remember-me" />
            <div>Remember me</div>
        </div>
        <div>Forgot your <a className="text-blue-700">password</a>?</div>
        <div>Dont have an account? <Link href='/register' className='text-blue-700'>Register now</Link></div>
        <button className="submit-buttons" type="submit">Login</button>
    </form>
</div>
}