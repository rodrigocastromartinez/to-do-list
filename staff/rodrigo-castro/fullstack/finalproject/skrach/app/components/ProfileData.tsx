'use client'

import Avatar from "./Avatar"
import { useState, useEffect } from "react"
import { UserModel } from "../data/interfaces"

  interface ProfileDataProps {
    onAvatarChange: () => void
    setModal: (arg1: string | undefined) => void
    userData: UserModel | undefined
  }

export default function ProfileData({ onAvatarChange, setModal, userData }: ProfileDataProps) {
    const [user, setUser] = useState<UserModel>()
  
    useEffect(() => {
      const fetchData = (async () => {
        try {
          setUser(userData)
        } catch (error: any) {
          console.error('Error fetching user data:', error)
        }
      })()
    }, [])

    const handleEditDescription = () => {
      setModal('description')
    }

    return <>
    {user && <div className="flex items-center gap-4">
        <div className="h-24 w-24">
            <Avatar changeAvatar={onAvatarChange} ></Avatar>
        </div>
        <div>
            <p className="font-semibold text-slate-300 text-lg" >{user.name}</p>
            <div className="flex gap-1" >
              <p className="font-normal text-slate-400">Lorem ipsum description</p>
              <span className="material-symbols-outlined text-slate-400" onClick={handleEditDescription} >edit</span>
            </div>
            <div className="flex gap-1 items-center"><p className="text-lg text-slate-300" >12</p><p className="text-slate-400" >projects</p></div>
        </div>
    </div>}
    </>
}