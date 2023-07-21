export default function Alert({ message, level, onAccept}) {
    console[level](message)

    return <section className="modal-window">
        <div className={"w-4/5 max-w-xs h-fit p-8 m-0 rounded-3xl bg-[var(--grey-100)] flex flex-col gap-2"}>
            <p className={`border-b border-solid border-[var(--grey-200)] m-0 pb-2 font-normal ${level === 'error' || level === 'warn'? 'text-red-600' : ''}`}>{level === 'error' ? 'ERROR: ' : 'WARNING: '}</p>
            <p className='m-0 pb-2 self-center'>{message}</p>
            <button onClick={onAccept} className="submit-buttons self-center">Accept</button>
        </div>
    </section>
}