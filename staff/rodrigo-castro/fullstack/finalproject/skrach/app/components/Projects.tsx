'use client'

import { useState, useEffect } from "react"
import retrieveUserProjects from "../logic/client/retrieveUserProjects"
import extractUserId from "../logic/client/extractUserId"
import { Project } from "../data"
import ProjectSummary from "./ProjectSummary"

interface ProjectsProps {
    setProjectId: string | undefined
    setEdition: boolean
}

export default function Projects({ setProjectId, setEdition }: ProjectsProps) {
    const [userProjects, setUserProjects] = useState<[typeof Project]>()

    useEffect(() => {
        const fetchData = async () => {
            const projects = await retrieveUserProjects()

            console.log(projects)

            setUserProjects(projects)
        }

        fetchData()
    }, [])

    const userId = extractUserId()

    console.log(userId)
    
    return <div className="flex flex-col gap-4">
        {userProjects && userProjects.map((project: typeof Project) => project.owners.includes(userId) && <ProjectSummary key={project._id} project={project} setProjectId={setProjectId} setEdition={setEdition} />) }
    </div>
}