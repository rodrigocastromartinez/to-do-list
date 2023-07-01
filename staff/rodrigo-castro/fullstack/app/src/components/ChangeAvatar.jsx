import { updateUserAvatar } from '../logic/updateUserAvatar'
import { context } from '../ui'
import { useAppContext } from '../hooks'

export default function ChangeAvatar({ onCancel, onAvatarChanged }) {
    const { freeze, unfreeze } = useAppContext()
    const handleCancel = () => onCancel()

    const handleChangeAvatar = (event) => {
        event.preventDefault()

        const avatar = event.target.avatarurl.value

        try {
            freeze()

            updateUserAvatar(context.token, avatar)
                .then(() => {
                    unfreeze()

                    onAvatarChanged()
                })
        } catch (error) {
            unfreeze()
            alert(error.message)
        }
    }

    return <section className="modal-window" name="modal-change-avatar">
        <div className="updating-menus">
            <div className="red-text"></div>
            <form action="" className="inputs" onSubmit={handleChangeAvatar}>
                <input type="text" className="input-field" name="avatarurl" placeholder="Insert avatar url" autoComplete="off" />
                <div>
                    <button className="submit-buttons">Save</button>
                    <button className="submit-buttons cancel-avatar-change" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    </section>
}