import { ProjectModel } from "../data/interfaces"

interface ProjectSummaryProps {
    project: ProjectModel
    onProjectSelected: (arg0: string) => void
}

export default function ProjectSummary({project: {_id, name, image}, onProjectSelected}: ProjectSummaryProps) {
    const random = Math.floor(Math.random() * 999) + 1

    return <>
    <div className="flex p-4 bg-[var(--grey-700)] justify-between rounded-lg">
            <div>
                <h2>{name}</h2>
                <p>control buttons</p>
                <p>progress bar</p>
            </div>
            <img src={`https://picsum.photos/500/500?random=${random}`} className="w-3/12" onClick={() => onProjectSelected(_id)} ></img>
        </div>
    </>
}