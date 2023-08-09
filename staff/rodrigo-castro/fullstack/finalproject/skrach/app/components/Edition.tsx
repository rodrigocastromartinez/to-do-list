import DynamicTitle from "./DynamicTitle"
import Button from "./Button"
import Track from "./Track"
import Controls from "./Controls"
import { useState } from "react"

interface EditionProps {
    onSaveChanges: () => void
    onGoBack: () => void
}

export default function Edition({ onSaveChanges, onGoBack }: EditionProps) {
    const [isRecording, setIsRecording] = useState(false)
    const [recording, setRecording] = useState<MediaRecorder>()
    const [chunks, setChunks] = useState<Blob[]>()
    const [audioUrl, setAudioUrl] = useState<string>()

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

    const stopRecording = () => {
        console.log('handleStopRecording')

        recording!.stop()
        console.log(recording!.state)

        console.log("recorder stopped")

        // const clipName = prompt("Enter a name for your sound clip")

        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })

        console.log(blob)

        setChunks([])

        // const urlsArray = audioUrl

        // esto sería si quisiera grabar cada toma en un array:
        // audioUrl.push(window.URL.createObjectURL(blob))

        // const track = window.URL.createObjectURL(blob)
        const track = URL.createObjectURL(blob)

        setAudioUrl(track)

        // const audioURL = window.URL.createObjectURL(blob)
        // audio.src = audioURL

        console.log(track)
        console.log(audioUrl)

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
                <Button size='wide' type='no-fill' text='Add Track' ></Button>
                <Button size='wide' type='no-fill' text='Add Member' ></Button>
            </div>
        </div>
        <div>
            <Track></Track>
            <p>{audioUrl}</p>
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