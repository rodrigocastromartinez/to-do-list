import SettingOption from "./SettingOption"

interface SettingsMenuProps {
    onCloseMenu: () => void
}

export default function SettingsMenu({ onCloseMenu }: SettingsMenuProps) {
    const handleChangePassword = () => {

    }

    return <>
        <div onClick={onCloseMenu} className="fixed min-w-full min-h-full top-0 left-0 bg-[var(--transparent)]"></div>

        <ul className="relative top-0 p-8 h-screen w-3/4 bg-[var(--black-100)] border-r border-[var(--grey-600)] flex flex-col gap-2">
            <SettingOption text={'Change password'} onOptionClicked={handleChangePassword} />
        </ul>
    </>
}