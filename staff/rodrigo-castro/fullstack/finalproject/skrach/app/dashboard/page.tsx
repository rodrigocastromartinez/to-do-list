'use client'

import { useState } from 'react'
import {createProject, retrieveUser, retrieveUserProjects, retrieveProject, retrieveUserEmail } from "../logic/client"
import { Edition, Button, SearchBar, ProfileData, Projects, NavigationBar, AvatarModal, MembersModal } from '../components'
import logoutUser from '../logic/client/logoutUser'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../hooks'
import { UserModel } from '../data/interfaces'
import { useEffect } from 'react'
import { ProjectModel } from '../data/interfaces'

export default function Home() {
    const [edition, setEdition] = useState(false)
    const [projectId, setProjectId] = useState<string | undefined>()
    const [modal, setModal] = useState<string | undefined>(undefined)
    const [user, setUser] = useState<UserModel>()
    const [projects, setProjects] = useState<[ProjectModel]>()
    const [owners, setOwners] = useState<{id: string, email: string}[]>()

    const { freeze, unfreeze } = useAppContext()

    useEffect(() => {
        freeze()
        try {
            (async () => {
                const user = await retrieveUser()

                const projects = await retrieveUserProjects()
    
                setUser(user)

                setProjects(projects)

                unfreeze()
            })()
        } catch(error: any) {
            unfreeze()
            alert(error.message)
        }
    }, [])

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
        freeze()

        logoutUser()

        router.push('/login')

        unfreeze()
    }

    const handleChangeAvatar = () => {
        setModal('avatar')
    }

    const handleProjectSelected = (id: string) => {
        freeze()
        try{
            (async () => {
                const project = await retrieveProject(id)
                
                setProjectId(id)

                setEdition(true)

                unfreeze()
            })()
        } catch(error: any) {
            alert(error.message)
        }
    }

    const handleAddMember = async (projectId: string) => {
        freeze()
        try {
            const project = await retrieveProject(projectId)
    
            const owners = await Promise.all(project.owners.map(async (owner: string) => {
                const email = await retrieveUserEmail(owner)
                
                return {id: owner, email}
            }))

            setOwners(owners)
            
            setModal('members')

            unfreeze()
        } catch(error: any) {
            unfreeze()

            alert(error.message)
        }

    }

    return <>
        <div >
            <NavigationBar onLogoutClicked={handleLogout} ></NavigationBar>
        </div>
    {!edition && user && projects && <div className="w-screen h-screen flex flex-col px-8 gap-4">
        <div className='relative top-20 flex flex-col gap-4'>
        <div>
            <ProfileData onAvatarChange={handleChangeAvatar} setModal={setModal} userData={user}></ProfileData>
        </div>
        <div className="flex gap-4" >
            <SearchBar></SearchBar>
            <Button size='fit' type='no-fill' rounded={true} text={'New'} onClick={handleNewProject} ></Button>
        </div>
        <div>
            <Projects projects={projects} onProjectSelected={handleProjectSelected}></Projects>
        </div>
        </div>
    </div>}

    {edition && projectId &&  <Edition onGoBack={handleGoBack} projectId={projectId} setModal={setModal} onAddMemberClicked={handleAddMember} /> }

    {modal === 'avatar' && <AvatarModal setModal={setModal} ></AvatarModal>}

    {modal === 'members' && owners && projectId && <MembersModal projectId={projectId} setModal={setModal} owners={owners} ></MembersModal>}
    </>
}