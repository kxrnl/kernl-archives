import { Link } from 'react-router-dom'

import icon from '../assets/icon.png'
// import logo from '../assets/logo-white-transparent.png'

import './styles/Footer.css'

export default function Footer() {
    return (
        <footer>


            <div id="footer-content">

                <div>
                    <div id="footer-hero">
                        <img src={icon} id="footer-icon"></img>
                        <h2>KERNL Archives</h2>
                        <p>© 2026 Terence Montecillo</p>
                    </div>

                    <p id="p">kernl_archives: my projects and devlog, saved in one place.</p>

                </div>

                <div id='quick-links' className="container">
                    <p id='quick-links-label' className="footer-label">Quick Links</p>
                    <Link to="/">Home</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/devlogs">Devlogs</Link>
                </div>

                <div id="contact" className="container">
                    <p id='contacts-label' className="footer-label">Contacts</p>
                    <Link to="mailto:kernl.main@gmail.com">Email</Link>
                    <Link to="https://www.instagram.com/kxrnl.main/">Instagram</Link>
                    <Link to="https://github.com/kxrnl">Github</Link>
                </div>

            </div>
        </footer>
    )
}