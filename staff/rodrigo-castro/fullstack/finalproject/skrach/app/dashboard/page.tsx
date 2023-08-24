'use client'

import { useState } from 'react'
import createProject from "../logic/client/createProject"
import { Edition, Button, SearchBar, ProfileData, Projects, NavigationBar } from '../components'
import logoutUser from '../logic/client/logoutUser'
import { useRouter } from 'next/navigation'

export default function Home() {
    const [edition, setEdition] = useState(false)
    const [projectId, setProjectId] = useState<string | undefined>()

    const router = useRouter()

    const handleNewProject = async () => {
        try {
            const res = await createProject()

            setProjectId(res.id)

            setEdition(true)
        } catch(error: any){
            alert(error.message)
        }
    }

    const handleGoBack = () => {
        setProjectId(undefined)
        setEdition(false)
    }

    const handleLogout = () => {
        logoutUser()

        router.push('/login')
    }

    return <>
    {!edition && <div className="w-screen h-screen flex flex-col px-8 gap-4">
        <div >
            <NavigationBar onLogoutClicked={handleLogout} ></NavigationBar>
        </div>
        <div className='relative top-16 flex flex-col gap-4'>
        <div>
            <ProfileData></ProfileData>
        </div>
        <div className="flex gap-4" >
            <SearchBar></SearchBar>
            <Button size='fit' type='no-fill' rounded={true} text={'New'} onClick={handleNewProject} ></Button>
        </div>
        <div>
            <Projects setProjectId={setProjectId} setEdition={setEdition} ></Projects>
        </div>
        </div>
    </div>}

    {edition && projectId &&  <Edition onGoBack={handleGoBack} projectId={projectId} /> }
    </>
}