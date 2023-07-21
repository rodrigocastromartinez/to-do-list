export default function BarActionIcon({ tag:Tag = "li", overallClass = '', iconClass, icon, textClass, text, ...props }) {
    return <>
        <Tag className={`${overallClass}`} {...props}>
            <span className={`${iconClass}`}>{icon}</span>
            {text && <span className={`${textClass}`}>{text}</span>}
        </Tag>
    </>
}