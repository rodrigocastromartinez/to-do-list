interface ProjectWithId {
    _id: string // This is the 'id' property that is automatically added by Mongoose
    name: string
    image: string
}

interface ProjectSummaryProps {
    project: ProjectWithId
    setProjectId: (arg0: string) => void
    setEdition: (arg0: boolean) => void
    key: string
}

export default function ProjectSummary({project: {_id, name, image}, setEdition, setProjectId}: ProjectSummaryProps) {
    const handleOnClick = () => {
        setProjectId(_id)

        setEdition(true)
    }

    return <>
    <div key={_id} className="flex p-4 bg-[var(--grey-700)] justify-between rounded-lg">
            <div>
                <h2>{name}</h2>
                <p>control buttons</p>
                <p>progress bar</p>
            </div>
            <img src={image || "https://picsum.photos/500/500?random=1"} className="w-3/12" onClick={handleOnClick} ></img>
        </div>
    </>
}