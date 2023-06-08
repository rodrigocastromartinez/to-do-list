import { updateUserCity } from '../logic/updateUserCity'
import { context } from '../ui'
import { useAppContext } from '../hooks'

export default function ChangeCity({ onCancel, onCityChanged }) {
    const { freeze, unfreeze } = useAppContext()

    const handleCancel = () => onCancel()

    const handleChangeCity = (event) => {
        event.preventDefault()

        const city = event.target.city.value

        try {
            freeze()

            updateUserCity(context.userId, city, error => {
                unfreeze()

                if (error) {
                    alert(error.message)

                    return
                }

                onCityChanged()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return <section className="modal-window">
        <div className="updating-menus">
            <form action="" className="inputs" onSubmit={handleChangeCity}>
                <input type="text" className="input-field" name="city" placeholder="Insert your city" autoComplete="off" />
                <div>
                    <button className="submit-buttons">Save</button>
                    <button className="submit-buttons cancel-avatar-change" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    </section>
}