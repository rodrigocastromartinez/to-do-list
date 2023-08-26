import { updateUserAvatar } from "../logic/client"
import Button from "./Button"

interface AvatarModalProps {
    setModal: (arg1: string | undefined) => void
}

export default function AvatarModal({setModal}: AvatarModalProps) {
    const handleCloseModal = () => setModal(undefined)

    const handleChangeAvatar = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const avatar = event.currentTarget.avatarurl.value

        await updateUserAvatar(avatar)

        setModal(undefined)
    }

    return <>
    <section className="fixed top-0 left-0 h-screen w-screen bg-[var(--black-transparent)] flex flex-col gap-4 justify-center items-center z-30 ">
        <div className="p-4 bg-[var(--grey-700)] rounded-2xl flex flex-col gap-1 w-4/5 h-fit">
            <form className="flex flex-col gap-4" onSubmit={handleChangeAvatar}>
                <input type="text" className="input" name="avatarurl" placeholder="Insert avatar url" autoComplete="off" />
                <div className="flex gap-4">
                    <Button size='wide' type='primary' text='Save' submit={true}></Button>
                    <Button size='wide' type='no-fill' text='Cancel' onClick={handleCloseModal}></Button>
                </div>
            </form>
        </div>
    </section>
    </>
}