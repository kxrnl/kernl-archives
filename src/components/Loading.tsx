import '../styles/Global.css'

function Loading({ className = '', fading = false }) {
    return (
        <div className={`loader ${fading ? 'hide' : ''} ${className}`}>
            <div className="loader-mask">
                < div className="loader-fill" ></div >
            </div >
        </div >
    )
}

export default Loading