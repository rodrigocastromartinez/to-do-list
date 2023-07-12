import Container from "../library/Container"

export default function RecordingControls({ }) {
    return <div className="bg-slate-400 h-12 w-48 p-4 flex items-center justify-between">
        <div className="flex items-center"><span class="material-symbols-rounded">
            skip_previous
        </span></div>
        <div className="flex items-center"><span class="material-symbols-rounded">
            fiber_manual_record
        </span></div>
        <div className="flex items-center"><span class="material-symbols-rounded">
            play_arrow
        </span></div>
    </div>
}