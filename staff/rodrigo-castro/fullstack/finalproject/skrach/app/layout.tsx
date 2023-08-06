'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import 'material-symbols'
import NavigationBar from './components/NavigationBar'
import { retrieveUser } from './logic/client/retrieveUser'
import useStorage from './hooks/useStorage'
import context from './logic/client/context'
import AppContext from './AppContext'
import Loader from './library/Loader'
import { useState } from 'react'

const { Provider } = AppContext
const roboto = Roboto({ subsets: ['latin'], weight: ['700'] })

// export const metadata: Metadata = {
//   title: 'skrach',
// }

export default function RootLayout({ children }: {children: React.ReactNode}) {
  const [loader, setLoader] = useState<boolean>()

  const freeze = () => setLoader(true)

  const unfreeze = () => setLoader(false)
  
  return (<Provider value={{ freeze, unfreeze }}>
    <html lang="en" className={`w-screen h-screen`}>
      <body className={`w-full h-full bg-black text-white`}>
        <NavigationBar />
        {loader && <Loader />}
        {children}
      </body>
    </html>
  </Provider>
  )
}
