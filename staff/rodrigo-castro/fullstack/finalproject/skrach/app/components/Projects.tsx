'use client'

import { useState, useEffect } from "react"
import retrieveUserProjects from "../logic/client/retrieveUserProjects"
import extractUserId from "../logic/client/extractUserId"
import { ProjectModel } from "../data/interfaces"
import ProjectSummary from "./ProjectSummary"
import React, { Dispatch, SetStateAction } from 'react'

interface ProjectsProps {
    projects: [ProjectModel]
    onProjectSelected: (arg0: string) => void
}

export default function Projects({ projects, onProjectSelected }: ProjectsProps) {
    const [userProjects, setUserProjects] = useState<[ProjectModel]>()

    useEffect(() => {
        const fetchData = async () => {
            setUserProjects(projects)
        }

        fetchData()
    }, [])

    const userId = extractUserId()

    console.log(userId)
    
    return <>
    {userProjects && <div className="flex flex-col gap-4">
        {userProjects && userProjects.map((project: ProjectModel) => project.owners.includes(userId) && <ProjectSummary key={project._id} project={project} onProjectSelected={onProjectSelected} />) }
    </div>}
    </>
}