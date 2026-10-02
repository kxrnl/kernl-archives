import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Banner from '../components/Banner'
import { supabase } from '../utils/supabase'

import '../styles/Projects.css'

interface ProjectWithDevlogCount {
    id: number
    projectName: string
    projectImage: string | null
    devlogCount: number
}

function Devlogs() {
    const location = useLocation()
    const [projects, setProjects] = useState<ProjectWithDevlogCount[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProjectsWithDevlogs() {
            const { data, error } = await supabase
                .from('devlogs')
                .select('project_ref, projects(id, projectName, projectImage)')

            if (error) {
                console.error('Error fetching devlogs:', error.message, error.details, error.hint)
                setLoading(false)
                return
            }

            const byProject: Record<number, ProjectWithDevlogCount> = {}

            for (const row of data as any[]) {
                const project = row.projects
                if (!project) continue

                if (!byProject[project.id]) {
                    byProject[project.id] = {
                        id: project.id,
                        projectName: project.projectName,
                        projectImage: project.projectImage,
                        devlogCount: 0,
                    }
                }
                byProject[project.id].devlogCount += 1
            }

            setProjects(Object.values(byProject))
            setLoading(false)
        }

        fetchProjectsWithDevlogs()
    }, [])

    return (
        <>
            <Banner />
            <main>
                <div className="sub-top">DEVLOGS</div>
                <div className="display">
                    <div className="grid">
                        {loading ? (
                            <p style={{ color: 'black' }}>Loading devlogs...</p>
                        ) : projects.length === 0 ? (
                            <h1 style={{ color: 'black', lineHeight: '.8' }}>
                                We are still gathering up devlogs...
                                <p style={{ color: 'grey', fontSize: 32, marginTop: 12 }}>Coming soon (⌐■_■)</p>
                            </h1>
                        ) : (
                            projects.map((project) => (
                                <Link
                                    key={project.id}
                                    to={`/devlogs/${project.id}`}
                                    state={{ background: location }}
                                    className="project-card"
                                >
                                    <div className="card">
                                        {project.projectImage ? (
                                            <img
                                                className="projectimg"
                                                src={project.projectImage}
                                                alt={project.projectName}
                                            />
                                        ) : (
                                            <div className="projectimg projectimg-placeholder">No image</div>
                                        )}
                                        <div className="card-content">
                                            <h3 className="card-title">{project.projectName}</h3>
                                            <span className="card-date">
                                                {project.devlogCount} devlog{project.devlogCount !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Devlogs