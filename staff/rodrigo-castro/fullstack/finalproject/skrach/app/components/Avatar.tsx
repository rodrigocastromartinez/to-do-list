import { retrieveUser } from "../logic/client/retrieveUser"
import Image from "next/image"

interface AvatarProps {
    token: string
}

export default async function Avatar({token}: AvatarProps) {
    const user = await retrieveUser(token)
    
    return <>
        {(user && <>
            <Image src={user.avatar || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'} alt=""/>
        </>)}
    </>
}