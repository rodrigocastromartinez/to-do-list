'use client'

import { useState, useEffect } from "react"
import { ProjectModel } from "../data/interfaces"
import ProjectSummary from "./ProjectSummary"
import React from 'react'
import { useAppContext } from "../hooks"

interface ProjectsProps {
    projects: [ProjectModel]
    onProjectSelected: (arg0: string) => void
    onDeleteClicked: (arg0: string) => void
    search: string
}

export default function Projects({ projects, onProjectSelected, onDeleteClicked, search }: ProjectsProps) {
    const [userProjects, setUserProjects] = useState<[ProjectModel]>()

    const { alert } = useAppContext()

    useEffect(() => {
        try {
            (async () => {    
                setUserProjects(projects)
            })()
        } catch(error: any) {
            alert(error.message)
        }
    }, [])

    return <>
    {userProjects && <div className="flex flex-col gap-4">
        {userProjects && userProjects.filter((project) => {
            return search.toLowerCase() === '' ? project : project.name.toLowerCase().includes(search)
        }).map((project: ProjectModel) => <ProjectSummary key={project._id} project={project} onProjectSelected={onProjectSelected} onDelete={onDeleteClicked}/>) }
    </div>}
    </>
}