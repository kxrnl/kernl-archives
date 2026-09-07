import { useEffect, useState } from 'react'
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
}

function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProjects() {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('projectDate', { ascending: false })

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
                                <ProjectCard
                                    key={project.id}
                                    projectId={project.projectId}
                                    projectName={project.projectName}
                                    projectDate={project.projectDate}
                                    projectImage={project.projectImage}
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Projects