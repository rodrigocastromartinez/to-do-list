export default function Track() {
    return <div className="bg-[var(--grey-700)] px-4 py-4 rounded-2xl flex justify-center items-center gap-4" >
        <div className="text-[var(--grey-600)]" ><span className="material-symbols-rounded !text-[32px]">music_note</span></div>
        <div className="h-16 w-full bg-[var(--grey-600)] rounded-2xl" ></div>
        <div className="flex items-center text-[var(--grey-600)]" ><span className="material-symbols-rounded !text-[32px]">fiber_manual_record</span></div>
        <div className="flex items-center text-[var(--grey-600)]" ><span className="material-symbols-rounded !text-[32px]">more_horiz</span></div>
    </div>
}