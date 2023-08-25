'use client'

import { useState } from 'react'
import createProject from "../logic/client/createProject"
import { Edition, Button, SearchBar, ProfileData, Projects, NavigationBar, AvatarModal } from '../components'
import logoutUser from '../logic/client/logoutUser'
import { useRouter } from 'next/navigation'

export default function Home() {
    const [edition, setEdition] = useState(false)
    const [projectId, setProjectId] = useState<string | undefined>()
    const [modal, setModal] = useState<string | undefined>(undefined)

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

    const handleChangeAvatar = () => {
        setModal('avatar')
    }

    return <>
        <div >
            <NavigationBar onLogoutClicked={handleLogout} ></NavigationBar>
        </div>
    {!edition && <div className="w-screen h-screen flex flex-col px-8 gap-4">
        <div className='relative top-20 flex flex-col gap-4'>
        <div>
            <ProfileData onAvatarChange={handleChangeAvatar} ></ProfileData>
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

    {modal === 'avatar' && <AvatarModal setModal={setModal} ></AvatarModal>}
    </>
}