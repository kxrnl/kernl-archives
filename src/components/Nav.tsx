import { Link } from "react-router-dom"

import logo from '../assets/icon.png'

import './styles/Nav.css'

function Nav() {
    return (
        <div className="top">
            <Link to="/" className="top-logo-holder"><img src={logo} className="logo-top"></img></Link>


            <div className="pages">
                <Link to="/projects"><span>PROJECTS</span></Link>
                <Link to="/devlogs"><span>DEVLOG</span></Link>
                <Link to="/about"><span>ABOUT</span></Link>
            </div>
        </div>

    )
}

export default Nav