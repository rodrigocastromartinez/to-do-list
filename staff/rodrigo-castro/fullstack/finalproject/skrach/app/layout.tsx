import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import 'material-symbols'
import NavigationBar from './components/NavigationBar'
import { retrieveUser } from './logic/client/retrieveUser'
import useStorage from './hooks/useStorage'

const roboto = Roboto({ subsets: ['latin'], weight: ['700'] })

export const metadata: Metadata = {
  title: 'skrach',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { getItem } = useStorage()

  const token = getItem('token', 'session')

  return (
    <html lang="en" className={`w-screen h-screen`}>
      <body className={`w-full h-full bg-black text-white`}>
        <NavigationBar/>
        {children}
      </body>
    </html>
  )
}
