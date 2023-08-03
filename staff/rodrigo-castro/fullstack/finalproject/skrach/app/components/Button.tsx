

interface ButtonProps {
    submit?: boolean,
    size: string,
    type: string,
    text: string,
    rounded: boolean,
    onClick?: (event: React.SyntheticEvent) => void
}

export default function Button({ submit = false, size, type, text, rounded = false, onClick, ...props }: ButtonProps) {
    return <>
        <button type={`${submit ? "submit" : "button"}`} className={`
            ${size === "fit" && "fit-button" }
            ${size === "wide" && "wide-button"}
            ${type === "primary" && "primary"}
            ${type === "secondary" && "secondary"}
            ${type === "no-fill" && "no-fill"}
            ${rounded && 'rounded-full'}
        `}{...props} onClick={onClick}>{text}</button>
    </>
}

// import "./Button.css"

// type Props = {
//     type: String,
//     size: String,
//     icon?: JSX.Element,
//     label: String,
//     onClick?: (event: React.SyntheticEvent) => void
// }

// export default function Button({ type, size, icon, label, onClick, ...props }: Props): JSX.Element {

//     return <>
//         <button type="submit" className={`
//             ${size === "small" && "button-container-small"}
//             ${size === "extrasmall" && "button-container-extrasmall"}
//             ${size === "medium" && "button-container-medium"}
//             ${type === "primary" && "primary"}
//             ${type === "secondary" && "secondary"}
//             ${type === "critical" && "critical"}`}{...props} onClick={onClick}>
//             {icon && <p className="body-text-bold">i</p>}
//             <p className={`body-text-bold ${type === "critical" ? "label-critical" : "label"}`}>{label}</p>
//         </button>
//     </>
// }