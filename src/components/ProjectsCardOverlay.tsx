import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { CardOverlay } from './ProjectOverlay'
import { supabase } from '../utils/supabase'

import './styles/ProjectsCardOverlay.css'

interface Project {
    id: number
    projectName: string
    projectDate: string
    projectImage: string | null
    project_description: string
    top_project: boolean
    github_link: string
    demo_link: string
}

export function ProjectCardOverlay() {
    const { id } = useParams()
    const location = useLocation()
    const passedProject = location.state?.project as Project | undefined

    const [project, setProject] = useState<Project | null>(passedProject ?? null)

    useEffect(() => {
        if (passedProject) return

        async function fetchProject() {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single()

            console.log(data)

            if (error) {
                console.error('Error fetching project:', error.message)
            } else {
                setProject(data)
            }
        }

        fetchProject()
    }, [id, passedProject])

    return (
        <CardOverlay>
            {project ? (
                <>
                    <div id="project-details">
                        {project.projectImage && (
                            <img className='project-overlay-img' src={project.projectImage} alt={project.projectName} />
                        )}

                        <span id="info-holder">
                            <h2 id="project-title">{project.projectName}</h2>
                            <p id="project-date">{project.projectDate}</p>
                            <p id="project-description">{project.project_description}</p>
                        </span>

                        <span id="project-badges">{project.top_project && (<p className="badge top-project">Featured</p>)}</span>
                    </div>

                    <span id="buttons-holder">
                        {project.github_link && <a className="project-buttons github" href={project.github_link} target='_blank'>Github</a>}
                        {project.demo_link && <a className="project-buttons demo" href={project.demo_link} target='_blank'>Visit Project</a>}
                    </span>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </CardOverlay>
    )
}