'use client'

import './globals.css'
import 'material-symbols'
import AppContext from './AppContext'
import Loader from './library/Loader'
import { useState } from 'react'

const { Provider} = AppContext

export default function App({ children }: {children: React.ReactNode}) {
  const [loader, setLoader] = useState<boolean>()
  const [feedback, setFeedback] = useState<{message: string, level: string}>()

  const freeze = () => setLoader(true)

  const unfreeze = () => setLoader(false)

  const handleShowAlert = (message: string, level = 'warn') => setFeedback({ message, level })

    return <Provider value={{ alert: handleShowAlert, freeze, unfreeze }}>
        {children}
        {loader && <Loader />}
  </Provider>
}