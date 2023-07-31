'use client'

import Image from "next/image"

type User = {
    name: string
    email: string
    password: string
    avatar: string
};

interface NavigationBarProps {
    user: User;
}
  

export default function NavigationBar({user} : NavigationBarProps) {
    return <header>
        <nav className="h-full w-full">
            <ul className="flex p-4 justify-between">
                <li><span className="material-symbols-outlined">menu</span></li>
                <li>
                    {user ? <Image src={user.avatar} alt=""></Image> : <Image src="../spite_lightning.svg" alt="" ></Image>}
                </li>
            </ul>
        </nav>
    </header>
}