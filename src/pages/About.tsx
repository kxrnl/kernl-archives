import '../styles/About.css'

import logo from '../assets/logo-white-transparent.png'
import flag from '../assets/flag.png'

import Footer from '../components/Footer';

const certs = [
    { issuer: "freeCodeCamp", name: "Responsive Web Design", details: ["Sep 2026", "300 hrs"], href: "https://freecodecamp.org/certification/kernl/responsive-web-design-v9", label: "Verify" },
    { issuer: "freeCodeCamp", name: "Legacy Responsive Web Design V8", details: ["Sep 2026", "300 hrs"], href: "https://freecodecamp.org/certification/kernl/responsive-web-design", label: "Verify" },
    { issuer: "TestDome", name: "JavaScript", details: ["Oct 2026"], href: "https://www.testdome.com/certificates/95e1e8fedec24a0d97ff594cafa8b7ce", label: "Verify" },
    { issuer: "TestDome", name: "HTML/CSS", details: ["Oct 2026"], href: "https://www.testdome.com/certificates/98faafba565a4f038fde50d69a47ba78", label: "Verify" },
    { issuer: "Hack Club", name: "Stardance Challenge", details: ["2 projects", "44 hrs"], href: "/certs/hackclub-stardance.pdf", label: "View PDF" },
    { issuer: "Cisco Networking Academy", name: "Introduction to Cybersecurity", details: ["Jul 2026"], href: "/certs/cisco-intro-to-cybersecurity.pdf", label: "View PDF" },
    { issuer: "LinkedIn Learning", name: "Foundations of the Fourth Industrial Revolution", details: ["Sep 2026", "2 hrs"], href: "/certs/linkedin-industry-4.pdf", label: "View PDF" },
];

function About() {
    return (
        <>
            <div className="first"><img src={logo} alt="KERNL logo" /></div>

            <h1 id="aboutcenterlabel">ABOUT ME</h1>

            <div className="second">
                <section className="about-content">
                    <div className="about-block">
                        <h2>Who I Am</h2>
                        <p>I'm Terence Montecillo / <strong>KERNL</strong>, a solo dev based in the Philippines <img src={flag} style={{ width: "16px" }} />. I'm a BSIT
                            student at FEU Tech, specializing in Cybersecurity, and I build games, sites,
                            and software on my own.</p>
                    </div>

                    <div className="about-block">
                        <h2>How It Started</h2>
                        <p>I started at 10 years old on Roblox, messing with experiments, UI, and small
                            game dev projects. Everything I know is self-taught. No bootcamp, no formal
                            track, just building things until they worked.</p>
                    </div>

                    <div className="about-block">
                        <h2>Where I'm Going</h2>
                        <p>I'm 18 now, still learning, still shipping. I'm aiming to land a role as a
                            cybersecurity analyst, game dev, web dev, or software dev.</p>
                    </div>

                    <div className="about-block">
                        <h2>Skills</h2>
                        <div className="equipment-grid">
                            <div className="equipment-category">
                                <h3>Core</h3>
                                <p>HTML, CSS, JavaScript, Java</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Game Dev</h3>
                                <p>LuaU, GDScript</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Also Know</h3>
                                <p>C#, C++, Python, TypeScript</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Database</h3>
                                <p>Firebase, Supabase</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Editor</h3>
                                <p>VSCodium</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Frameworks</h3>
                                <p>React.js, Next.js, Electron</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-block">
                        <h2>Certifications</h2>
                        <div className="equipment-grid">
                            {certs.map((c) => (
                                <div className="equipment-category" key={c.name}>
                                    <h3>{c.issuer}</h3>
                                    <p>{c.name}</p>
                                    {c.details.map((d) => (
                                        <p className="sub-p" key={d}>{d}</p>
                                    ))}
                                    <p className="sub-p-link">
                                        <a href={c.href} target="_blank" rel="noopener noreferrer">{c.label}</a>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="about-block">
                        <h2>Equipment</h2>
                        <div className="equipment-grid">
                            <div className="equipment-category">
                                <h3>Laptop</h3>
                                <p>Lenovo IdeaPad Slim3</p>
                                <p className="sub-p">512GB Storage</p>
                                <p className="sub-p">16GB RAM</p>
                                <p className="sub-p">AMD Ryzen 5</p>
                                <p className="sub-p">Windows 11</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Server</h3>
                                <p>Linux Mint</p>
                                <p className="sub-p">256GB Storage</p>
                                <p className="sub-p">4GB RAM</p>
                                <p className="sub-p">Intel Pentium Gold</p>
                            </div>
                            <div className="equipment-category">
                                <h3>External Monitor</h3>
                                <p>LG 1080p</p>
                                <p className="sub-p">Unbranded Mount</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Keyboard</h3>
                                <p>RedDragon Fizz K617 (White)</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Mouse</h3>
                                <p>Fantech Kanata VX9</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Mouse Pad</h3>
                                <p>Artisan NinjaFX (Red) & Fantech</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Audio Devices</h3>
                                <p>UGREEN HiTune Max5C (Black)</p>
                                <p>UGREEN HiTune H5 (White)</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}

export default About;