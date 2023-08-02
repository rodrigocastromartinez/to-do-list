'use client'

import Image from "next/image"
import context from "../logic/client/context"
import Avatar from "../components/Avatar"

export default function Home() {
    const token = context.token

    return <div className="w-screen relative top-16 flex flex-col">
        <div className="bg-[var(--orange-300)] h-16 w-16">
            {/* <Image></Image> */}
            <p>{token}</p>
            {/* <Avatar></Avatar> */}
        </div>
    </div>
}