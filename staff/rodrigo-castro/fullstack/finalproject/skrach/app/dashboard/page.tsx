import Image from "next/image"
import context from "../logic/client/context"
import Avatar from "../components/Avatar"
import ProfileData from "../components/ProfileData"
import { retrieveUser } from "../logic/client/retrieveUser"
import { useState, useEffect } from 'react'

export default function Home() {
    return <div className="w-screen relative top-20 flex flex-col px-8">
        <div>
            <ProfileData></ProfileData>
        </div>
    </div>
}