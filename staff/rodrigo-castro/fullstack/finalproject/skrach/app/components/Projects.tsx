'use client'

import { useState, useEffect } from "react"
import retrieveUserProjects from "../logic/client/retrieveUserProjects"
import extractUserId from "../logic/client/extractUserId"
import { ProjectModel } from "../data/interfaces"
import ProjectSummary from "./ProjectSummary"
import React, { Dispatch, SetStateAction } from 'react'

interface ProjectsProps {
    setProjectId: Dispatch<SetStateAction<string | undefined>>
    setEdition: Dispatch<SetStateAction<boolean>>
}

export default function Projects({ setProjectId, setEdition }: ProjectsProps) {
    const [userProjects, setUserProjects] = useState<[ProjectModel]>()

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
        {userProjects && userProjects.map((project: ProjectModel) => project.owners.includes(userId) && <ProjectSummary key={project._id} project={project} setProjectId={setProjectId} setEdition={setEdition} />) }
    </div>
}