'use client'

import SettingsMenu from "./SettingsMenu"
import { useState } from "react"

interface NavigationBarProps {
    onLogoutClicked: () => void
}

export default function NavigationBar({onLogoutClicked} : NavigationBarProps) {
    const [menu, setMenu] = useState(false)

    const handleSettings = () => {

    }

    const handleCloseMenu = () => {
        setMenu(false)
    }

    return <header className="fixed top-0 left-0 w-screen h-16 bg-[var(--black-100)]">
        <nav className="h-full w-full border-solid border-b border-slate-800">
            <ul className="flex px-8 py-4 justify-between">
                <li className="h-6 w-6 text-slate-400" onClick={handleSettings} ><span className="material-symbols-outlined">settings</span></li>
                <li className="h-6 w-6 text-slate-400" onClick={onLogoutClicked} ><span className="material-symbols-outlined">logout</span></li>
            </ul>
        </nav>
        {/* <SettingsMenu onCloseMenu={handleCloseMenu} ></SettingsMenu> */}
    </header>
}