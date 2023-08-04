'use client'

interface NavigationBarProps {
}

export default function NavigationBar({} : NavigationBarProps) {
    return <header className="fixed w-screen z-50 bg-[var(--black-100)]">
        <nav className="h-full w-full border-solid border-b border-slate-800">
            <ul className="flex px-8 py-4 justify-between">
                <li className="h-6 w-6 text-slate-400" ><span className="material-symbols-outlined">menu</span></li>
                <li className="h-6 w-6 text-slate-400"><span className="material-symbols-outlined">settings</span></li>
            </ul>
        </nav>
    </header>
}