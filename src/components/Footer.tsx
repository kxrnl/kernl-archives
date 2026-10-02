import { Link } from 'react-router-dom'

import './styles/Footer.css'

export default function Footer() {
    return (
        <footer>
            <h2>KERNL Archives</h2>
            <p>© 2026 Terence Montecillo</p>

            <div id="footer-content">
                <p id="p">kernl_archives: my projects and devlog, saved in one place.</p>

                <div id='quick-links' className="container">
                    <p id='quick-links-label'>Quick Links</p>
                    <Link to="/">Home</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/devlogs">Devlogs</Link>
                </div>

                <div id="contact" className="container">
                    <p id='quick-links-label'>Contacts</p>
                    <Link to="/">Email</Link>
                    <Link to="/projects">Instagram</Link>
                    <Link to="/devlogs">Github</Link>
                </div>

            </div>
        </footer>
    )
}