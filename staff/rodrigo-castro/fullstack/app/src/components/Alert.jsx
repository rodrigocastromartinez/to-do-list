import './Alert.css'

export default function Alert({ message, level, onAccept}) {
    console[level](message)

    return <section className="modal-window">
        <div className="alert-modal">
            <p className={`alert-title ${level === 'error' || level === 'warn'? 'critical' : ''}`}>{level === 'error' ? 'ERROR: ' : 'WARNING: '}</p>
            <p className='alert-message'>{message}</p>
            <button onClick={onAccept} className="submit-buttons accept">Accept</button>
        </div>
    </section>
}