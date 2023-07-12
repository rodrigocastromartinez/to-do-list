import Container from '../library/Container'
import RecordingChannel from '../components/RecordingChannel'
import RecordingControls from '../components/RecordingControls'
import { context } from '../ui'
import { useState } from 'react'


export default function Recording({ }) {
    const record = document.querySelector(".record")
    const stop = document.querySelector(".stop")
    const soundClips = document.querySelector(".sound-clips")
    const [recording, setRecording] = useState()

    const handleStartRecording = () => {
        console.log('handleStartRecording')

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("getUserMedia supported.");
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

                    mediaRecorder.start(2000) // el 2000 son los ms antes de comenzar a grabar entiendo
                    console.log(mediaRecorder.state)
                    console.log("recorder started")

                    let chunks = []

                    mediaRecorder.ondataavailable = (chunk) => {
                        chunks.push(chunk.data)
                    }

                })

                // Error callback
                .catch((err) => {
                    console.error(`The following getUserMedia error occurred: ${err}`);
                });
        } else {
            console.log("getUserMedia not supported on your browser!");
        }

    }

    const handleStopRecording = () => {
        console.log('handleStopRecording')

        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
    }


    return <Container tag="div" className='gap-2'>
        <Container tag="div" className='flex-row h-16 gap-4'>
            <img src='https://picsum.photos/400/400?random=1' className='h-full' />
            <div>
                <p>Project name</p>
                <p>Author name</p>
            </div>
        </Container>
        <Container tag='div'>

        </Container>

        <div className="bg-slate-400 h-12 w-48 p-4 flex items-center justify-between">
            <div className="flex items-center"><span className="material-symbols-rounded">piano</span></div>
            <div>xxxxxxxxxx</div>
            <div className="flex items-center"><span className="material-symbols-rounded">
                fiber_manual_record
            </span></div>
            <div className="flex items-center"><span className="material-symbols-rounded">
                more_horiz
            </span></div>
        </div>

        <div className="bg-slate-400 h-12 w-48 p-4 flex items-center justify-between">
            <div className="flex items-center"><span className="material-symbols-rounded">
                skip_previous
            </span></div>
            <div className="flex items-center" onClick={handleStopRecording}><span className="material-symbols-rounded">
                stop_circle
            </span></div>
            <div className="flex items-center" onClick={handleStartRecording}><span className={`material-symbols-rounded`}>
                fiber_manual_record
            </span></div>
            <div className="flex items-center"><span className="material-symbols-rounded">
                play_arrow
            </span></div>
        </div>

    </Container>
}