import { useParams } from "react-router-dom";
import { CardOverlay } from "./ProjectOverlay";

export function DevlogCardOverlay() {
    const { id } = useParams();
    return (
        <CardOverlay>
            <h2>Devlog {id}</h2>
        </CardOverlay>
    );
}