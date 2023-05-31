import { changeEmail } from '../logic/updateUserEmail'
import { context } from '../ui'

export default function ChangeEmail({onCancel, onEmailChanged}) {
    const handleChangeEmail = (event) => {
        event.preventDefault()

        const previousEmail = event.target['previous-email'].value
        const newEmail = event.target['new-email'].value
        const password = event.target['change-email-pass'].value

        try{
            freeze()

            changeEmail(context.userId, previousEmail, newEmail, password, (error) => {
                unfreeze()
                
                if(error){
                    alert(error.message)
                }

                onEmailChanged()
            })
        } catch(error) {
            alert(error.message)
        }
    }

    const handleCancelChangeEmail = () => onCancel()
    
    return <section className="modal-window" name="modal-change-email">
    <div className="updating-menus">
        <div className="red-text"></div>
        <form className="inputs" onSubmit={handleChangeEmail}>
            <input className="input-field changing-inputs change-email-input" type="email" name="previous-email" placeholder="Previous email"/>
            <input className="input-field changing-inputs new-email-input" type="email" name="new-email" placeholder="New email"/>
            <input className="input-field changing-inputs change-email-pass-input" type="password" name="change-email-pass" placeholder="Password"/>
            <div>
                <button className="submit-buttons change-my-password" name="change-my-password" type="submit">Save</button>
                <button className="submit-buttons cancel-email-change" type="button" onClick={handleCancelChangeEmail}>Cancel</button>
            </div>
        </form>
    </div>
</section>
}