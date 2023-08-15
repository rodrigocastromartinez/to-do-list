'use client'

import DynamicTitle from "./DynamicTitle"
import Button from "./Button"
import TrackCompo from "./TrackCompo"
import Controls from "./Controls"
import { useState, useEffect } from "react"
import { saveAudio } from "../logic/client/saveAudio"
// import { storage } from '../firebase'
import { firebase } from '../firebase'
import { createTrack } from "../logic/client/createTrack"
// import { ref, uploadBytes } from 'firebase/storage'
import retrieveProject from "../logic/client/retrieveProject"

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
    const [tracks, setTracks] = useState<[typeof TrackCompo]>()

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
                    // constraints - es para indicar que solamente se grabe audio
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
                .catch((err) => {
                    console.error(`The following getUserMedia error occurred: ${err}`);
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

        // PARA ENVIAR A FIREBASE DESDE EL FRONT
        // const { ref } = await firebase.storage().ref().child(`${projectId}/${trackId}.ogg`).put(blob)

        // const url = await ref.getDownloadURL()

        // PARA ENVIAR A API Y SUBIR A FIREBASE DESDE API ---NO VA---
        console.log(blob)
        const formData = new FormData()
        formData.append('audio-file', blob)
        console.log('Form data:')
        console.log(formData)
        await saveAudio(formData, '64da33cd801596bb4be8172e', '64da33db801596bb4be81736')
        } catch(error: any) {
            console.error(error.message)
        }

        // setAudioUrl(url)
        // console.log(url)

        // return console.log(url)
        
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
        <div>
            {/* {tracks && tracks.map(track => {
                <p>{track.id}</p>
            })} */}
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