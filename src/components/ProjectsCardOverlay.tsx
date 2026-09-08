import { useParams } from "react-router-dom";
import { CardOverlay } from "./ProjectOverlay";

export function ProjectCardOverlay() {
    const { id } = useParams();
    return (
        <CardOverlay>
            <h2>Project {id}</h2>
        </CardOverlay>
    );
}