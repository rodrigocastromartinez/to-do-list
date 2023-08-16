import { TrackModel } from "../data/interfaces"
import { Dispatch, SetStateAction } from "react"
import { useState } from "react"
import Instruments from "./Instruments"

interface TrackProps {
    trackData: TrackModel
    setTrackId: Dispatch<SetStateAction<string | undefined>>
    trackId: string | undefined
}

export default function TrackCompo({ trackData, setTrackId, trackId }: TrackProps) {
    const [selectInstrument, setSelectInstrument] = useState(false)
    const [instrument, setInstrument] = useState<string>(trackData.instrument)

    const handleSelectInstrument = () => setSelectInstrument(true)

    const handleTrackSelected = () => setTrackId(trackData._id)

    return <>
        <div className={`bg-[var(--grey-700)] px-4 py-4 rounded-2xl flex justify-center items-center gap-4 ${trackId === trackData._id ? 'outline-2 outline-[var(--orange-300)] outline outline-inner' : ''}`} onClick={handleTrackSelected} >
            <div className="text-[var(--grey-600)]" onClick={handleSelectInstrument} ><span className="material-symbols-rounded !text-[32px]">music_note</span></div>
            <div className="h-16 w-full bg-[var(--grey-600)] rounded-2xl" ></div>
            <div className="flex items-center text-[var(--grey-600)]" ><span className="material-symbols-rounded !text-[32px]">fiber_manual_record</span></div>
            <div className="flex items-center text-[var(--grey-600)]"><span className="material-symbols-rounded !text-[32px]">more_horiz</span></div>
        </div>
        {selectInstrument && <Instruments trackData={trackData} setInstrument={setInstrument} instrument={instrument} ></Instruments> }
    </>
}