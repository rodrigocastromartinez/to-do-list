'use client'

import { TrackModel } from "../data/interfaces"
import { Dispatch, SetStateAction } from "react"
import { useState, useEffect } from "react"
import Instruments from "./Instruments"
import { retrieveProject } from "../logic/client"
import { Slider, ButtonGroup, Button } from "@mui/material"
import { saveDelay } from '../logic/client'

interface TrackProps {
    trackData: TrackModel
    setTrackId: Dispatch<SetStateAction<string | undefined>>
    trackId: string
    projectId: string
}

export default function TrackCompo({ trackData, setTrackId, trackId, projectId }: TrackProps) {
    const [selectInstrument, setSelectInstrument] = useState(false)
    const [instrument, setInstrument] = useState<string>(trackData.instrument)
    const [url, setUrl] = useState()
    const [delay, setDelay] = useState<number>()
    // const [volume, setVolume] = useState(trackData.volume)

    useEffect(() => {
        try {
            const fetchData = (async () => {
                const project = await retrieveProject(projectId!)
    
                const track = project.tracks.find((track: TrackModel) => track.id === trackId)
    
                setUrl(track.audio)
    
                setDelay(trackData.delay)
            })()
        } catch(error: any) {
            alert(error.message)
        }

    }, [])

    const handleSelectInstrument = () => setSelectInstrument(true)

    const handleTrackSelected = () => setTrackId(trackData._id)

    const handleSetVolume = (value: number) => {
        // trackData.volume = value

        // setVolume(value)
    }

    const handleLessDelay = async () => {
        try {
            if(delay! < 50) return
    
            const _delay = delay! - 50
            
            await saveDelay(projectId!, trackData._id, _delay)
    
            setDelay(_delay)
        } catch(error: any) {
            alert(error.message)
        }
    }

    const handleMoreDelay = async () => {
        try {
            const _delay = delay! + 50
            
            await saveDelay(projectId!, trackData._id, _delay)
    
            setDelay(_delay)
        } catch(error: any) {
            alert(error.message)
        }
    }

    return <>
        <div className={`bg-[var(--grey-700)] px-4 py-4 flex flex-col gap-4 rounded-2xl ${trackId === trackData._id ? 'outline-2 outline-[var(--orange-300)] outline outline-inner' : ''}`} onClick={handleTrackSelected} >
            <div className={` flex justify-center items-center gap-4`} >
                <div className="text-[var(--grey-600)]" onClick={handleSelectInstrument} ><span className="material-symbols-rounded !text-[32px]">music_note</span></div>
                <div className="h-16 w-full bg-[var(--grey-600)] rounded-2xl" >{url && <audio id={trackData._id} src={trackData.audio} preload="" >{trackData.delay}</audio> }</div>
                <div className="flex items-center text-[var(--grey-600)]" ><span className="material-symbols-rounded !text-[32px]">fiber_manual_record</span></div>
                <div className="h-4/5" >
                    <Slider
                    size="small"
                    defaultValue={70}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    orientation="vertical"
                    sx={{
                        color: 'var(--orange-300)',
                    }}
                    onChange={(value) => handleSetVolume}
                    />
                </div>
            </div>
            <div className="flex justify-center items-center gap-4 text-[var(--grey-600)]" >
                <p className="font-semibold" >Delay:</p>
                <p className="font-semibold" >{delay || '0'} ms</p>
                <ButtonGroup variant="outlined" aria-label="outlined button group" size="small" >
                    <Button 
                    onClick={handleLessDelay}
                    sx={{
                        outline: "2px solid var(--orange-300)",
                        outlineOffset: "-1px",
                        color: "var(--orange-300)",
                        fontWeight: "700"
                    }}>-</Button>
                    <Button 
                    onClick={handleMoreDelay}
                    sx={{
                        outline: "2px solid var(--orange-300)",
                        outlineOffset: "-1px",
                        color: "var(--orange-300)",
                        fontWeight: "700"
                    }}>+</Button>
                </ButtonGroup>
            </div>
        </div>
        {selectInstrument && <Instruments trackData={trackData} setInstrument={setInstrument} instrument={instrument} ></Instruments> }
    </>
}