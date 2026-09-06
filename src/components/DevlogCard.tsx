import './styles/DevlogCard.css'

interface DevlogCardProps {
    devlogName: string
    devlogDate: string
    devlogImage: string
}

function DevlogCard({ devlogName, devlogDate, devlogImage }: DevlogCardProps) {
    return (
        <div className="card">
            <img className="gameimg" src={devlogImage} alt={devlogName} />
            <div className="card-content">
                <h3 className="card-title">{devlogName}</h3>
                <span className="card-date">{devlogDate}</span>
            </div>
        </div>
    )
}

export default DevlogCard