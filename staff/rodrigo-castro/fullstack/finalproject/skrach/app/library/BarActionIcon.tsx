interface BarActionIconProps {
    tag?: keyof JSX.IntrinsicElements,
    overallClass?: string,
    iconClass: string,
    icon: string,
    textClass?: string,
    text?: string
}

export default function BarActionIcon({ tag: Tag = "li", overallClass = '', iconClass, icon, textClass, text, ...props }: BarActionIconProps) {
    return (
        <Tag className={`${overallClass}`} {...props}>
            <span className={`${iconClass}`}>{icon}</span>
            {text && <span className={`${textClass}`}>{text}</span>}
        </Tag>
    );
}
