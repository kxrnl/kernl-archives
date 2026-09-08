import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import '../components/styles/Overlay.css'

interface CardOverlayProps {
    children: React.ReactNode;
    onClose?: () => void;
}

export function CardOverlay({ children, onClose }: CardOverlayProps) {
    const navigate = useNavigate();

    const close = onClose ?? (() => navigate(-1));

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [close]);

    return (
        <div className="overlay-backdrop" onClick={close}>
            <div className="overlay-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                <button className="overlay-close" onClick={close} aria-label="Close">
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}