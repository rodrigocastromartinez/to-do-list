'use client'

import DynamicTitle from "./DynamicTitle"
import Button from "./Button"
import TrackCompo from "./TrackCompo"
import Controls from "./Controls"
import { useState, useEffect } from "react"
import { firebase } from '../firebase'
import createTrack from "../logic/client/createTrack"
import retrieveProject from "../logic/client/retrieveProject"
import { TrackModel } from "../data/interfaces"
import InstrumentsModal from "./Instruments"

interface EditionProps {
    onSaveChanges: () => void
    onGoBack: () => void
    projectId: string
}

export default function Edition({ onSaveChanges, onGoBack, projectId }: EditionProps) {
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [recording, setRecording] = useState<MediaRecorder>()
    const [chunks, setChunks] = useState<Blob[]>()
    const [audioUrl, setAudioUrl] = useState<string>()
    const [trackId, setTrackId] = useState<string | undefined>()
    const [tracks, setTracks] = useState<[TrackModel]>()

    useEffect(() => {
        const fetchData = (async () => {
            const project = await retrieveProject(projectId)

            setTracks(project.tracks)
        })()
    }, [])

    const handleAddTrack = async () => {
        if (projectId) {
            const { id: trackId } = await createTrack(projectId)

            setTrackId(trackId)
        }
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

                    mediaRecorder.start(2000) // el 2000 son los ms antes de comenzar a grabar entiendo
                    console.log(mediaRecorder.state)
                    console.log("recorder started")

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

        const url = await ref.getDownloadURL() // GUARDAR URL EN DB (MODELO EMBEBIDO) PARA BUSCARLA LUEGO Y CARGARLA EN LA PANTALLA EDIT



        console.log(url)

    } catch (error: any) {
        console.log(error.message)
    }
}

    const handleToggleRec = () => {
        if(!isRecording) {
            startRecording()

            setIsRecording(true)
        } else {
            stopRecording()

            setIsRecording(false)
        }
    }

    return <>
        <div className="w-screen h-full relative pt-20 flex flex-col justify-between px-8 gap-4" >
        <div className="flex flex-col gap-2" >
            <DynamicTitle></DynamicTitle>
            <div className="flex gap-2" >
                <Button size='wide' type='no-fill' text='Add Track' onClick={handleAddTrack} ></Button>
                <Button size='wide' type='no-fill' text='Add Member' ></Button>
            </div>
        </div>
        <div className="flex flex-col justify-start h-full gap-4">
            {tracks && tracks.map(track => <TrackCompo key={track._id} trackData={track} setTrackId={setTrackId} trackId={trackId} /> )}
        </div>
        <div className="flex flex-col mb-4">
            <Controls onToggleRec={handleToggleRec}></Controls>
            <div className="flex gap-2" >
                <Button size='wide' type='primary' text={'Save'} onClick={onSaveChanges} ></Button>
                <Button size='wide' type='grey' text={'Back'} onClick={onGoBack} ></Button>
            </div>
        </div>
    </div>
    </>
}