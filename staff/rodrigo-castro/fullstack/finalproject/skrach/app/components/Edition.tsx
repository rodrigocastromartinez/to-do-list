'use client'

import DynamicTitle from "./DynamicTitle"
import Button from "./Button"
import TrackCompo from "./TrackCompo"
import Controls from "./Controls"
import MembersModal from "./MembersModal"
import { useState, useEffect } from "react"
import { firebase } from '../firebase'
import createTrack from "../logic/client/createTrack"
import retrieveProject from "../logic/client/retrieveProject"
import deleteTrack from "../logic/client/deleteTrack"
import { TrackModel } from "../data/interfaces"
import { saveUrl } from "../logic/client"

interface EditionProps {
    onGoBack: () => void
    projectId: string
}

export default function Edition({ onGoBack, projectId }: EditionProps) {
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [recording, setRecording] = useState<MediaRecorder>()
    const [chunks, setChunks] = useState<Blob[]>()
    const [audioUrl, setAudioUrl] = useState<string>()
    const [trackId, setTrackId] = useState<string | undefined>()
    const [tracks, setTracks] = useState<[TrackModel]>()
    const [addMember, setAddMember] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = (async () => {
            const project = await retrieveProject(projectId)

            setTracks(project.tracks)
        })()
    }, [])

    const handleAddTrack = async () => {
        try {
            if (projectId) {
                const { id: trackId } = await createTrack(projectId)

                const project = await retrieveProject(projectId)

                setTracks(project.tracks)
            }
        } catch(error: any) {
            alert(error.message)
        }
    }

    const handleDeleteTrack = async () => {
        if (!trackId) return

        const res = await deleteTrack(projectId, trackId)

        setTracks(res.tracks)
    }

    const handleAddMember = async () => {
        setAddMember(true)
    }

    const startRecording = () => {
        console.log('handleStartRecording')

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("getUserMedia supported.")
            navigator.mediaDevices
                .getUserMedia(
                    {
                        audio: true,
                    },
                )

                // Success callback
                .then((stream) => {
                    const mediaRecorder = new MediaRecorder(stream);

                    setRecording(mediaRecorder)
                    
                    mediaRecorder.start(2000) // chunk duration in ms
                    console.log(mediaRecorder.state)
                    console.log("recorder started")
                    
                    const audios = document.querySelectorAll('audio')
                    audios.forEach(audio => audio.id !== trackId && audio.play())

                    let chunks: Blob[] = []

                    mediaRecorder.ondataavailable = (chunk) => {
                        chunks.push(chunk.data)
                    }

                    setChunks(chunks)
                })

                // Error callback
                .catch((error) => {
                    console.error(`The following getUserMedia error occurred: ${error}`);
                });
        } else {
            console.log("getUserMedia not supported on your browser!");
        }
    }

    const stopRecording = async() => {
    try {
        console.log('handleStopRecording')

        recording!.stop()
        console.log(recording!.state)

        console.log("recorder stopped")

        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })

        const { ref } = await firebase.storage().ref().child(`${projectId}/${trackId}.ogg`).put(blob)

        const url = await ref.getDownloadURL()

        await saveUrl(projectId, trackId!, url)

        console.log(url)

    } catch (error: any) {
        console.log(error.message)
    }
}

    const handleToggleRec = () => {
        try {
            if(trackId){
                if(!isRecording) {
                    startRecording()
        
                    setIsRecording(true)
                } else {
                    stopRecording()
        
                    setIsRecording(false)
                }
            }
        } catch(error: any) {
            console.log(error.message)
        }
    }

    const handlePlay = () => {
        const audios = document.querySelectorAll('audio')

        audios.forEach(audio => {
            const track = tracks!.find((track: TrackModel) => track._id === audio.id)

            console.log(track!.volume)

            audio.volume = (track!.volume) / 100
        })

        audios.forEach(audio => {
            setTimeout(() => {
                audio.play()
            }, parseInt(audio.textContent!))
        })
    }

    const handleCloseModal = () => {
        setAddMember(false)
    }

    return <>
        {addMember && <MembersModal projectId={projectId} onCloseModal={handleCloseModal} ></MembersModal>}

        <div className="w-screen h-full relative pt-20 flex flex-col justify-between px-8 gap-4" >
        <div className="flex flex-col gap-2" >
            <DynamicTitle projectId={projectId} ></DynamicTitle>
            <div className="flex gap-2" >
                <Button size='wide' type='no-fill' text='Add Track' onClick={handleAddTrack} ></Button>
                <Button size='wide' type='no-fill' text='Add Member' onClick={handleAddMember} ></Button>
            </div>
        </div>
        <div className="flex flex-col justify-start h-full gap-4">
            {tracks && tracks.map(track => <TrackCompo key={track._id} trackData={track} setTrackId={setTrackId} trackId={trackId!} projectId={projectId} setTracks={setTracks} /> )}
        </div>
        <div className="flex flex-col p-4 fixed bottom-0 left-0 w-screen bg-[var(--black-100)]">
            <Controls onToggleRec={handleToggleRec} onPlay={handlePlay} ></Controls>
            <div className="flex gap-2" >
                <Button size='wide' type='primary' text={'Delete'} onClick={handleDeleteTrack} ></Button>
                <Button size='wide' type='grey' text={'Back'} onClick={onGoBack} ></Button>
            </div>
        </div>
    </div>
    </>
}