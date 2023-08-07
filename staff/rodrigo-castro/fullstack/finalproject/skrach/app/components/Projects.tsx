import { useState, useEffect } from "react"
import retrieveUserProjects from "../logic/client/retrieveUserProjects"

export default function Projects() {
    const [userProjects, setUserProjects] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const projects = await retrieveUserProjects()

            console.log(projects[0]._id)

            setUserProjects(projects)
        }

        fetchData()
    }, [])
    
    return <>
        {userProjects && <div className="flex p-4 bg-[var(--grey-700)] justify-between rounded-lg" >
            <div>
                <h2>{userProjects[0].name}</h2>
                <p>control buttons</p>
                <p>progress bar</p>
            </div>
            <img src={userProjects[0].image} className="w-3/12" ></img>
        </div> }
    </>
}