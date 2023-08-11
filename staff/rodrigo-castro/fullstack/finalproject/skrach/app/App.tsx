'use client'


import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import 'material-symbols'
import NavigationBar from './components/NavigationBar'
import { retrieveUser } from './logic/client/retrieveUser'
// import useStorage from './hooks/useStorage'
import context from './logic/client/context'
import AppContext from './AppContext'
import Loader from './library/Loader'
import { useState } from 'react'

const { Provider} = AppContext

export default function App({ children }: {children: React.ReactNode}) {
  const [loader, setLoader] = useState<boolean>()

  const freeze = () => setLoader(true)

  const unfreeze = () => setLoader(false)

    return <Provider value={{ freeze, unfreeze }}>
        <NavigationBar></NavigationBar>
        {children}
        {loader && <Loader />}
  </Provider>
}