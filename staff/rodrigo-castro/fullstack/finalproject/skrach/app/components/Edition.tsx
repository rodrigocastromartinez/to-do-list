import DynamicTitle from "./DynamicTitle"
import Button from "./Button"
import Track from "./Track"
import Controls from "./Controls"

interface EditionProps {
    onSaveChanges: () => void
    onGoBack: () => void
}

export default function Edition({ onSaveChanges, onGoBack }: EditionProps) {
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
        </div>
        <div className="flex flex-col mb-4">
            <Controls></Controls>
            <div className="flex gap-2" >
                <Button size='wide' type='primary' text={'Save'} onClick={onSaveChanges} ></Button>
                <Button size='wide' type='grey' text={'Back'} onClick={onGoBack} ></Button>
            </div>
        </div>
    </div>
    </>
}