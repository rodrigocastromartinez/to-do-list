import Image from "next/image"
import { TrackModel } from "../data/interfaces"
import { Dispatch, SetStateAction } from "react"

interface InstrumentsProps {
    trackData: TrackModel
    setInstrument: Dispatch<SetStateAction<string>>
    instrument: string
}

export default function Instruments({ trackData, setInstrument, instrument }: InstrumentsProps) {
    const onNoteSelected = () => {

    }

    return <>
        <div className="flex justify-center items-center h-fit w-fit relative top-0 left-0 z-50">
            <div className="flex justify-center items-center w-80 h-fit p-4 rounded-2xl bg-[var(--grey-700)]">
                <ul className="flex flex-row gap-6">
                    <li onClick={onNoteSelected} ><img src="/note.svg" className={`h-8 w-8 ${instrument && instrument === 'note' ? 'filter-orange' : ''}`}/></li>
                    <li ><img src="/mic.svg" className={`h-8 w-8 ${instrument && instrument === 'mic' ? 'filter-orange' : ''}`}/></li>
                    <li ><img src="/guitar.svg" className={`h-8 w-8 ${instrument && instrument === 'guitar' ? 'filter-orange' : ''}`}/></li>
                    <li ><img src="/piano.svg" className={`h-8 w-8 ${instrument && instrument === 'piano' ? 'filter-orange' : ''}`}/></li>
                    <li ><img src="/drums.svg" className={`h-8 w-8 ${instrument && instrument === 'drums' ? 'filter-orange' : ''}`}/></li>
                </ul>
            </div>
        </div>
    </>
}