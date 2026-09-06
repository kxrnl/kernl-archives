import { Link } from 'react-router-dom';

import '../styles/NotFound.css'

function NotFound() {
    return (
        <div className='holder'>
            <img className="sillyImage" alt='404 Cat' src="https://http.cat/404"></img>
            <h1>Not Found<sub>?</sub></h1>
            <Link to="/" className='return-btn'><span>Go Back</span></Link>
        </div>
    )
}

export default NotFound;