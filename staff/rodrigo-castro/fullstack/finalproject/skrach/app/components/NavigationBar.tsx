'use client'

import Avatar from "./Avatar"
import context from "../logic/client/context"
import Image from "next/image";

type User = {
    name: string
    email: string
    password: string
    avatar: string
};

interface NavigationBarProps {
}

export default function NavigationBar({} : NavigationBarProps) {
    const token = context.token

    return <header className="fixed w-screen z-50 bg-[var(--black-100)]">
        <nav className="h-full w-full border-solid border-b border-slate-800">
            <ul className="flex px-8 py-4 justify-between">
                <li className="h-6 w-6" ><span className="material-symbols-outlined">menu</span></li>
                <li className="h-6 w-6 flex justify-center content-center">
                    {/* {(token && <Avatar token={token} ></Avatar>) || (<Image src="/spite_lightning.svg" width={16} height={16} alt="" ></Image>)} */}
                    <Image src="/spite_lightning.svg" width={16} height={16} alt="" ></Image>
                </li>
            </ul>
        </nav>
    </header>
}