import { useParams } from "react-router-dom";
import { CardOverlay } from "./ProjectOverlay";

import ProjectCard from "./ProjectCard";

export function ProjectCardOverlay() {
    const { id } = useParams();
    return (
        <CardOverlay>
            <h2>Project {id}</h2>

            <ProjectCard projectId="1" projectName="Test" projectDate="Test Date" projectImage={null} top_project={false} display_order={0}></ProjectCard>
        </CardOverlay>
    );
}