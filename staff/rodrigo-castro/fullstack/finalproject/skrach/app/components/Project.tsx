import { useState, useEffect } from 'react'

export default function Project(projectId) {
    const [project, setProject] = useState()
    
    useEffect(() => {
        const fetchData = (async () => {
            try{

            } catch(error){
                const projectData = await retrieveProject(projectId)
            }
        })()

        setProject(project)
    }, [])

    return <div>
        <div>
            <p></p>
        </div>
        <img></img>
    </div>
}