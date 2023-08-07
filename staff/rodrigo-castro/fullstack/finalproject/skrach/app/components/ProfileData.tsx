'use client'

import Avatar from "./Avatar"
import { useState, useEffect } from "react"
import { retrieveUser } from "../logic/client/retrieveUser"
import { useAppContext } from "../hooks"
import { User } from '../data/models'

  type AppContext = {
    freeze: () => void;
    unfreeze: () => void;
  }

export default function ProfileData() {
    const [user, setUser] = useState<typeof User | null>(null)
    const [loading, setLoading] = useState(true)
    
    const { freeze, unfreeze } = useAppContext() as AppContext

  
    useEffect(() => {
      const fetchData = async () => {
        freeze()
        try {
          unfreeze()
          const userData = await retrieveUser()
          setUser(userData)
          setLoading(false)
        } catch (error) {
          unfreeze()
          console.error('Error fetching user data:', error)
          setLoading(false)
        }
      }
  
      fetchData()
    }, [])
  
    if (loading) {
      return <></>
    }
  
    if (!user) {
      unfreeze()

      console.error('Error: Unable to retrieve user data.')
  
      return
    }

    unfreeze()

    return <div className="flex items-center gap-4">
        <div className="h-24 w-24">
            <Avatar></Avatar>
        </div>
        <div>
            <p className="font-semibold text-slate-300 text-lg" >{user.name}</p>
            <p className="font-normal text-slate-400">Lorem ipsum description</p>
            <div className="flex gap-1 items-center"><p className="text-lg text-slate-300" >12</p><p className="text-slate-400" >projects</p></div>
        </div>
    </div>
}