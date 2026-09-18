import './styles/ProjectCard.css'

interface ProjectCardProps {
    projectId: string
    projectName: string
    projectDate: string
    projectImage: string | null
    display_order?: number
    top_project?: boolean
}

function ProjectCard({ projectName, projectDate, projectImage, top_project }: ProjectCardProps) {
    return (
        <div className={`card ${top_project ? 'card--top' : ''}`}>


            {projectImage ? (
                <img className="projectimg" src={projectImage} alt={projectName} />
            ) : (
                <div className="projectimg projectimg-placeholder">No image</div>
            )}
            <div className="card-content">
                <h3 className="card-title">{projectName}</h3>
                <span className="card-date">{projectDate}</span>
                {top_project && <span className="card-badge">Featured</span>}
            </div>
        </div>
    )
}

export default ProjectCard