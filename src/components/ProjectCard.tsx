import './styles/ProjectCard.css'

interface ProjectCardProps {
    projectId: string
    projectName: string
    projectDate: string
    projectImage: string | null
}

function ProjectCard({ projectName, projectDate, projectImage }: ProjectCardProps) {
    return (
        <div className="card">
            {projectImage ? (
                <img className="projectimg" src={projectImage} alt={projectName} />
            ) : (
                <div className="projectimg projectimg-placeholder">No image</div>
            )}
            <div className="card-content">
                <h3 className="card-title">{projectName}</h3>
                <span className="card-date">{projectDate}</span>
            </div>
        </div>
    )
}

export default ProjectCard