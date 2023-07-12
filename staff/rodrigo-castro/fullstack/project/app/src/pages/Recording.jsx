import Container from '../library/Container'
import RecordingChannel from '../components/RecordingChannel'
import RecordingControls from '../components/RecordingControls'


export default function Recording({ }) {

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
            <div className="flex items-center"><span className="material-symbols-rounded">
                fiber_manual_record
            </span></div>
            <div className="flex items-center"><span className="material-symbols-rounded">
                play_arrow
            </span></div>
        </div>

    </Container>
}