import Container from '../library/Container'
import RecordingChannel from '../components/RecordingChannel'
import RecordingControls from '../components/RecordingControls'
import { context } from '../ui'
import { useState } from 'react'
import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'


export default function Recording({ }) {
    const record = document.querySelector(".record")
    const stop = document.querySelector(".stop")
    const soundClips = document.querySelector(".sound-clips")
    const [recording, setRecording] = useState()
    const [chunks, setChunks] = useState()
    const [audioUrls, setAudioUrl] = useState([])

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

                    setRecording(mediaRecorder)

                    mediaRecorder.start(2000) // el 2000 son los ms antes de comenzar a grabar entiendo
                    console.log(mediaRecorder.state)
                    console.log("recorder started")

                    let chunks = []

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

    const handleStopRecording = () => {
        console.log('handleStopRecording')

        recording.stop()
        console.log(recording.state)
        console.log("recorder stopped")

        console.log("recorder stopped")

        const clipName = prompt("Enter a name for your sound clip")

        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })

        setChunks([])

        // const urlsArray = audioUrls

        audioUrls.push(window.URL.createObjectURL(blob))

        setAudioUrl(audioUrls)

        // const audioURL = window.URL.createObjectURL(blob)
        // audio.src = audioURL

        console.log(audioUrls)
    }

    // const wavesurfer = WaveSurfer.create({
    //     container: document.body,
    //     waveColor: 'rgb(200, 0, 200)',
    //     progressColor: 'rgb(100, 0, 100)',
    //     url: '/examples/audio/audio.wav',
    // })

    // wavesurfer.once('interaction', () => {
    //     wavesurfer.play()
    // })



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

        {/* <div className="bg-slate-400 h-12 w-96 p-4 flex items-center justify-between">
            <div className="flex items-center"><span className="material-symbols-rounded">piano</span></div>
            <div>xxxxxxxxxx</div>
            <div className="flex items-center"><span className="material-symbols-rounded">
                fiber_manual_record
            </span></div>
            <div className="flex items-center"><span className="material-symbols-rounded">
                more_horiz
            </span></div>
        </div> */}

        {audioUrls !== [] && audioUrls.map(audioUrl => {
            {/* const wavesurfer = WaveSurfer.create({
                container: `#audiowave-${audioUrl}`,
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
                url: audioUrl,
            }) */}

            return <div className="bg-slate-400 h-12 w-72 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center"><span className="material-symbols-rounded">piano</span></div>
                <div id={`audiowave-${audioUrl}`} className="w-36 h-8 bg-slate-500" ></div>
                <div className="flex items-center"><span className="material-symbols-rounded">
                    fiber_manual_record
                </span></div>
                <div className="flex items-center"><span className="material-symbols-rounded">
                    more_horiz
                </span>
                <audio controls src={audioUrl}></audio></div>
            </div>
        })
        }

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