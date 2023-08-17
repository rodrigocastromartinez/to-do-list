import BarActionIcon from '../library/BarActionIcon'

interface ControlsProps {
    onToggleRec: () => void
    onPlay: () => void
}

export default function Controls({ onToggleRec, onPlay }: ControlsProps) {
    return <ul className="flex justify-center items-center text-slate-400" >
        <BarActionIcon iconClass={'material-symbols-rounded !text-[48px]'} icon={'skip_previous'} ></BarActionIcon>
        <BarActionIcon iconClass={'material-symbols-rounded !text-[48px]'} icon={'radio_button_unchecked'} action={onToggleRec} ></BarActionIcon>
        <BarActionIcon iconClass={'material-symbols-rounded !text-[48px]'} icon={'play_arrow'} action={onPlay} ></BarActionIcon>
    </ul>
}