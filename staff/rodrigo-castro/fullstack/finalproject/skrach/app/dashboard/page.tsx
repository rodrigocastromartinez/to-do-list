'use client'

import ProfileData from "../components/ProfileData"
import SearchBar from "../components/SearchBar"
import Button from "../components/Button"
import { useState } from 'react'
import DynamicTitle from "../components/DynamicTitle"
import Controls from "../components/Controls"
import Track from "../components/Track"
import { createProject } from "../logic/client/createProject"

export default function Home() {
    const [newProject, setNewProject] = useState(false)

    const handleNewProject = () => {
        try {
            createProject()

            setNewProject(true)
        } catch(error: any){
            alert(error.message)
        }
    }

    const handleSaveChanges = () => {

    }

    const handleBack = () => setNewProject(false)

    return <>
    {!newProject && <div className="w-screen relative top-20 flex flex-col px-8 gap-4">
        <div>
            <ProfileData></ProfileData>
        </div>
        <div className="flex gap-4" >
            <SearchBar></SearchBar>
            <Button size='fit' type='no-fill' rounded={true} text={'New'} onClick={handleNewProject} ></Button>
        </div>
        <div>

        </div>
    </div>}

    {newProject && <div className="w-screen h-full relative pt-20 flex flex-col justify-between px-8 gap-4" >
        <div className="flex flex-col gap-2" >
            <DynamicTitle></DynamicTitle>
            <div className="flex gap-2" >
                <Button size='wide' type='no-fill' text='Add Track' ></Button>
                <Button size='wide' type='no-fill' text='Add Member' ></Button>
            </div>
        </div>
        <div>
            <Track></Track>
        </div>
        <div className="flex flex-col mb-4">
            <Controls></Controls>
            <div className="flex gap-2" >
                <Button size='wide' type='primary' text={'Save'} onClick={handleSaveChanges} ></Button>
                <Button size='wide' type='grey' text={'Back'} onClick={handleBack} ></Button>
            </div>
        </div>
    </div> }
    </>
}