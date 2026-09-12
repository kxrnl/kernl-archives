import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Banner from '../components/Banner'
import ProjectCard from '../components/ProjectCard'
import { supabase } from '../utils/supabase'

import '../styles/Projects.css'

interface Project {
    id: number
    projectId: string
    projectName: string
    projectDate: string
    projectImage: string | null
    display_order: number
    top_project: boolean
}

function Projects() {
    const location = useLocation()
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProjects() {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('display_order', { ascending: true })

            if (error) {
                console.error('Error fetching projects:', error.message, error.details, error.hint)
            } else {
                setProjects(data)
            }
            setLoading(false)
        }

        fetchProjects()
    }, [])

    return (
        <>
            <Banner />
            <main>
                <div className="sub-top">PROJECTS</div>
                <div className="display">
                    <div className="grid">
                        {loading ? (
                            <p style={{ color: 'black' }}>Loading projects...</p>
                        ) : (
                            projects.map((project) => (
                                <Link
                                    key={project.id}
                                    to={`/projects/view/${project.id}`}
                                    state={{ background: location }}
                                >
                                    <ProjectCard
                                        projectId={project.projectId}
                                        projectName={project.projectName}
                                        projectDate={project.projectDate}
                                        projectImage={project.projectImage}
                                        display_order={project.display_order}
                                        top_project={project.top_project}
                                    />
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Projects