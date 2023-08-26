'use client'

import './globals.css'
import 'material-symbols'
import AppContext from './AppContext'
import Loader from './library/Loader'
import { useState } from 'react'

const { Provider} = AppContext

export default function App({ children }: {children: React.ReactNode}) {
  const [loader, setLoader] = useState<boolean>()

  const freeze = () => setLoader(true)

  const unfreeze = () => setLoader(false)

    return <Provider value={{ freeze, unfreeze }}>
        {children}
        {loader && <Loader />}
  </Provider>
}