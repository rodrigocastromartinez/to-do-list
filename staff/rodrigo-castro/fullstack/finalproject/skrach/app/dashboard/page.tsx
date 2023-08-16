'use client'

import { useState } from 'react'
import createProject from "../logic/client/createProject"
import { Edition, Button, SearchBar, ProfileData, Projects } from '../components'

export default function Home() {
    const [edition, setEdition] = useState(false)
    const [projectId, setProjectId] = useState<string | undefined>()

    const handleNewProject = async () => {
        try {
            const res = await createProject()

            setProjectId(res.id)

            setEdition(true)
        } catch(error: any){
            alert(error.message)
        }
    }

    const handleSaveChanges = () => {

    }

    const handleGoBack = () => {
        setProjectId(undefined)
        setEdition(false)
    }

    return <>
    {!edition && <div className="w-screen relative top-20 flex flex-col px-8 gap-4">
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
    </div>}

    {edition && projectId &&  <Edition onSaveChanges={handleSaveChanges} onGoBack={handleGoBack} projectId={projectId} /> }
    </>
}