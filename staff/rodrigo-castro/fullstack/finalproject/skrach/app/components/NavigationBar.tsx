'use client'

import Avatar from "./Avatar"
import context from "../logic/client/context"
import Image from "next/image"
import { useState, useEffect } from 'react'

interface NavigationBarProps {
    token: string
}

export default function NavigationBar({token} : NavigationBarProps) {
    return <header className="fixed w-screen z-50 bg-[var(--black-100)]">
        <nav className="h-full w-full border-solid border-b border-slate-800">
            <ul className="flex px-8 py-4 justify-between">
                <li className="h-6 w-6 text-slate-400" ><span className="material-symbols-outlined">menu</span></li>
                <li className="h-6 w-6 text-slate-400"><span className="material-symbols-outlined">settings</span></li>
            </ul>
        </nav>
    </header>
}