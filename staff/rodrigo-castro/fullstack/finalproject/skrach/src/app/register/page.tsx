import Link from 'next/link'
import { Roboto } from 'next/font/google'
import Container from '../library/Container'

const roboto = Roboto({ subsets: ['latin'], weight: ['300'] })

export default function Register() {
    return <Container tag="div" className='flex min-h-screen min-w-screen flex-col justify-center items-center gap-4'>
    <h1 className="text-4xl font-semibold">Register</h1>
    <form className="flex flex-col gap-4 items-center w-4/5" >
        <input className={`input ${roboto.className}`} type="text" name="name" placeholder="User name" />
        <input className={`input ${roboto.className}`} type="email" name="email" placeholder="Email" />
        <input className={`input ${roboto.className}`} type="password" name="password" placeholder="Password" />
        <div>Already registered? <Link href='/login' className='text-blue-700'>Sign in</Link></div>
        <button className="submit-buttons" type="submit">Register</button>
    </form>
</Container>
}