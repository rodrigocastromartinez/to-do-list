'use client'

import { TrackModel } from "../data/interfaces"
import { Dispatch, SetStateAction } from "react"
import { useState, useEffect } from "react"
import Instruments from "./Instruments"
import { retrieveProject } from "../logic/client"
import { Slider, ButtonGroup, Button } from "@mui/material"
import { saveDelay, updateVolume } from '../logic/client'

interface TrackProps {
    trackData: TrackModel
    setTrackId: Dispatch<SetStateAction<string | undefined>>
    trackId: string
    projectId: string
    setTracks: Dispatch<SetStateAction<TrackModel[] | undefined>>
}

export default function TrackCompo({ trackData, setTrackId, trackId, projectId, setTracks }: TrackProps) {
    const [selectInstrument, setSelectInstrument] = useState(false)
    const [instrument, setInstrument] = useState<string>(trackData.instrument)
    const [url, setUrl] = useState()
    const [delay, setDelay] = useState<number>()
    const [volume, setVolume] = useState<number>(trackData.volume)
    const [pendingVolume, setPendingVolume] = useState<number | null>(null)
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)

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

    const handleChange = async (event: Event, value: number | number[], activeThumb: number) => {
        try {
            if (typeof value === 'number') {
                const newValue = value
    
                const audio = document.getElementById(trackData._id) as HTMLAudioElement
    
                audio!.volume = (newValue as number) / 100
    
                setVolume(newValue as number)

                        // Cancela el temporizador existente si existe
                if (timerId) {
                    clearTimeout(timerId);
                }
        
                // Configura un nuevo temporizador para ejecutar la actualización después de 500 ms
                const newTimerId = setTimeout(async () => {
                    if (pendingVolume !== null) {
                    // Ejecuta la actualización con el valor pendiente
                    await updateVolume(projectId, trackData._id, newValue)

                    console.log(newValue)

                    setPendingVolume(null); // Limpia el valor pendiente

                    const project = await retrieveProject(projectId)

                    setTracks(project.tracks)
                    }
                }, 500)
        
                setTimerId(newTimerId); // Almacena el nuevo ID de temporizador
                setPendingVolume(newValue); // Almacena el valor pendiente
            }
        } catch (error: any) {
            alert(error.message)
        }
    }
    

    const handleSelectInstrument = () => setSelectInstrument(true)

    const handleTrackSelected = () => setTrackId(trackData._id)

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
                    value={volume}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    orientation="vertical"
                    sx={{
                        color: 'var(--orange-300)',
                    }}
                    onChange={handleChange}
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