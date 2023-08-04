import BarActionIcon from '../library/BarActionIcon'

export default function Controls() {
    return <ul className="flex justify-center items-center text-slate-400" >
        <BarActionIcon iconClass={'material-symbols-rounded !text-[48px]'} icon={'skip_previous'} ></BarActionIcon>
        <BarActionIcon iconClass={'material-symbols-rounded !text-[48px]'} icon={'radio_button_unchecked'} ></BarActionIcon>
        <BarActionIcon iconClass={'material-symbols-rounded !text-[48px]'} icon={'play_arrow'} ></BarActionIcon>
    </ul>
}