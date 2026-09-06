import './styles/GameCard.css'

interface GameCardProps {
    gameId: string
    gameName: string
    gameDate: string
    gameImage: string | null
}

function GameCard({ gameName, gameDate, gameImage }: GameCardProps) {
    return (
        <div className="card">
            {gameImage ? (
                <img className="gameimg" src={gameImage} alt={gameName} />
            ) : (
                <div className="gameimg gameimg-placeholder">No image</div>
            )}
            <div className="card-content">
                <h3 className="card-title">{gameName}</h3>
                <span className="card-date">{gameDate}</span>
            </div>
        </div>
    )
}

export default GameCard