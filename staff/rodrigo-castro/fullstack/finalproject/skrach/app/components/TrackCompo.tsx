'use client'

import { TrackModel } from "../data/interfaces"
import { Dispatch, SetStateAction } from "react"
import { useState, useEffect } from "react"
import Instruments from "./Instruments"
import { Project } from "../data"
import { retrieveProject } from "../logic/client"

interface TrackProps {
    trackData: TrackModel
    setTrackId: Dispatch<SetStateAction<string | undefined>>
    trackId: string | undefined
    projectId: string | undefined
}

export default function TrackCompo({ trackData, setTrackId, trackId, projectId }: TrackProps) {
    const [selectInstrument, setSelectInstrument] = useState(false)
    const [instrument, setInstrument] = useState<string>(trackData.instrument)
    const [url, setUrl] = useState()

    useEffect(() => {
        const fetchData = (async () => {
            const project = await retrieveProject(projectId!)

            const track = project.tracks.find((track: TrackModel) => track.id === trackId)

            setUrl(track.audio)
        })()
    }, [])

    const handleSelectInstrument = () => setSelectInstrument(true)

    const handleTrackSelected = () => setTrackId(trackData._id)

    return <>
        <div className={`bg-[var(--grey-700)] px-4 py-4 rounded-2xl flex justify-center items-center gap-4 ${trackId === trackData._id ? 'outline-2 outline-[var(--orange-300)] outline outline-inner' : ''}`} onClick={handleTrackSelected} >
            <div className="text-[var(--grey-600)]" onClick={handleSelectInstrument} ><span className="material-symbols-rounded !text-[32px]">music_note</span></div>
            <div className="h-16 w-full bg-[var(--grey-600)] rounded-2xl" >{url && <audio id={trackData._id} src={trackData.audio}></audio> }</div>
            <div className="flex items-center text-[var(--grey-600)]" ><span className="material-symbols-rounded !text-[32px]">fiber_manual_record</span></div>
            <div className="flex items-center text-[var(--grey-600)]"><span className="material-symbols-rounded !text-[32px]">more_horiz</span></div>
        </div>
        {selectInstrument && <Instruments trackData={trackData} setInstrument={setInstrument} instrument={instrument} ></Instruments> }
    </>
}