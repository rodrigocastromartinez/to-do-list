import Button from "./Button"
import { retrieveProject, retrieveUserEmail, addMember, extractUserId, retrieveUser, deleteMember } from "../logic/client"
import { FormEvent, useEffect, useState } from "react"
import { Chip } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

interface MembersModalParams {
    projectId: string
    setModal: Dispatch<SetStateAction<string | undefined>>
}

export default function MembersModal({ projectId, setModal }: MembersModalParams) {
    const [owners, setOwners] = useState<{ id: string, email: string }[]>()
    const [emailInput, setEmailInput] = useState('')

    useEffect(() => {
        const fetchData = (async () => {
            try {
                const project = await retrieveProject(projectId)
    
                const owners = await Promise.all(project.owners.map(async (owner: string) => {
                    const email = await retrieveUserEmail(owner)
                    
                    return {id: owner, email}
                }))

                setOwners(owners)
            } catch(error: any) {
                alert(error.message)
            }
        })()
    }, [])

    const handleAdd = async (event: FormEvent) => {
        event.preventDefault()

        try {
            const target = event.target as typeof event.target & {
                email: {value: string}
            }
    
            console.log(target.email.value)
    
            const res = await addMember(projectId, target.email.value)

            const owners = await Promise.all(res.owners.map(async (owner: string) => {
                const email = await retrieveUserEmail(owner)
                
                return {id: owner, email}
            }))

            setOwners(owners)

            setEmailInput('')
        } catch(error: any) {
            alert(error.message)
        }

    }

    const handleDelete = async (owner: { id: string, email: string }) => {
        try {
            const project = await retrieveProject(projectId)

            const user = await retrieveUser()
    
            if(project.owners.length <= 1 || user.email === owner.email) return

            const res = await deleteMember(projectId, owner.id)

            const owners = await Promise.all(res.owners.map(async (owner: string) => {
                const email = await retrieveUserEmail(owner)
                
                return {id: owner, email}
            }))

            setOwners(owners)
        } catch(error: any) {
            alert(error.message)
        }
    }

    const handleCloseModal = () => setModal(undefined)
    
    return <>
    <div className="fixed top-0 left-0 h-screen w-screen bg-[var(--black-transparent)] flex flex-col gap-4 justify-center items-center z-30 ">
        <div className="p-4 bg-[var(--grey-700)] rounded-2xl flex flex-col gap-1 w-4/5 h-fit">
            <form className="flex gap-2" onSubmit={handleAdd} >
                <input name="email" className="text-base text-[var(--black-100)] rounded-2xl bg-[var(--grey-500)] h-fit m-0 font-light py-2 px-4 w-full focus:outline-input-none placeholder:text-[var(--black-100)]" placeholder="Email" value={emailInput} onChange={(event) => setEmailInput(event.target.value)}></input>
                <Button size={'fit'} type={'primary'} text={'Add'} submit={true} ></Button>
            </form>
            <div className="" >
                {owners && owners.map(owner => {
                    return <Chip 
                    key={owner.id} 
                    label={owner.email} 
                    onDelete={() => handleDelete(owner)}
                    sx={{
                        backgroundColor: 'var(--grey-500)',
                        color: 'var(--grey-700)',
                        fontSize: '16px',
                        width: 'fit-content',
                        margin: '0.25rem'
                    }}
                    ></Chip>
                } )}
            </div>
        <Button size='wide' type='primary' text='Cancel' onClick={handleCloseModal}></Button>
        </div>
    </div>
    </>
}