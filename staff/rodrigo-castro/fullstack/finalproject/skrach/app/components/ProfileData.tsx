'use client'

import Avatar from "./Avatar"
import { useState, useEffect } from "react"
import { retrieveUser } from "../logic/client/retrieveUser"

interface User {
    avatar: string
    name: string
  }

export default function ProfileData() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userData = await retrieveUser()
          setUser(userData)
          setLoading(false)
        } catch (error) {
          console.error('Error fetching user data:', error)
          setLoading(false)
        }
      }
  
      fetchData()
    }, [])
  
    if (loading) {
      return <div className="flex flex-col">
        <div className="h-20 w-20">
        <img src='https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'></img>
        </div>
        <section>
            <p>Loading...</p>
            <p>Loading...</p>
            <p>Loading...</p>
        </section>
    </div>
    }
  
    if (!user) {
      console.error('Error: Unable to retrieve user data.')
  
      return
    }

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