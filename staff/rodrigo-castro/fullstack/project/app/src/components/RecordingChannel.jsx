

export default function RecordingChannel({ audioUrl, wavesurfer }) {
    return <div className="bg-slate-400 h-12 w-72 p-4 flex items-center justify-between gap-4">
        <div className="flex items-center"><span className="material-symbols-rounded">piano</span></div>
        <div id={`audiowave-${audioUrl}`} className="w-36 h-8 bg-slate-500" ></div>
        <div className="flex items-center"><span className="material-symbols-rounded">
            fiber_manual_record
        </span></div>
        <div className="flex items-center"><span className="material-symbols-rounded">
            more_horiz
        </span></div>
    </div>
}