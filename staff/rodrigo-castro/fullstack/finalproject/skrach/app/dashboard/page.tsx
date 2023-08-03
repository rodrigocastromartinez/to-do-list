import Image from "next/image"
import context from "../logic/client/context"
import Avatar from "../components/Avatar"
import ProfileData from "../components/ProfileData"
import { retrieveUser } from "../logic/client/retrieveUser"
import { useState, useEffect } from 'react'
import SearchBar from "../components/SearchBar"
import Button from "../components/Button"

export default function Home() {
    return <div className="w-screen relative top-20 flex flex-col px-8 gap-4">
        <div>
            <ProfileData></ProfileData>
        </div>
        <div className="flex gap-4" >
            <SearchBar></SearchBar>
            <Button size='fit' type='no-fill' rounded={true} text={'New'} ></Button>
        </div>
    </div>
}