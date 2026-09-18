import '../styles/About.css'

import logo from '../assets/logo-white-transparent.png'

function About() {
    return (
        <>
            {/* Hard coded im so lazy to break it down but its beautiful *insert proud emoji with tears* */}

            <div className="first"><img src={logo} /></div>

            <h1 id="aboutcenterlabel">ABOUT ME</h1>

            <div className="second">
                <section className="about-content">
                    <div className="about-block">
                        <h2>Who I Am</h2>
                        <p>I'm Terence Montecillo / <strong>KERNL</strong>, a solo dev based in the Philippines. I'm a BSIT
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
                                <p>C#, C++, Python</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Database</h3>
                                <p>Firebase, Supabase</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Editor</h3>
                                <p>VSCodium</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-block">
                        <h2>Certifications</h2>
                        <div className="equipment-grid">
                            <div className="equipment-category">
                                <h3>Cisco</h3>
                                <p>Introduction to Cybersecurity</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Stardance</h3>
                                <p>Hack Club Stardance Challenge</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-block">
                        <h2>Equipment</h2>
                        <div className="equipment-grid">
                            <div className="equipment-category">
                                <h3>Laptop</h3>
                                <p>Lenovo IdeaPad Slim3</p>
                                <p className='sub-p'>512GB Storage</p>
                                <p className='sub-p'>16GB RAM</p>
                                <p className='sub-p'>AMD Ryzen 5</p>
                                <p className='sub-p'>Windows 11</p>
                            </div>
                            <div className="equipment-category">
                                <h3>Server</h3>
                                <p>Linux Mint</p>
                                <p className='sub-p'>256GB Storage</p>
                                <p className='sub-p'>4GB RAM</p>
                                <p className='sub-p'>Intel Pentium Gold</p>
                            </div>
                            <div className="equipment-category">
                                <h3>External Monitor</h3>
                                <p>LG 1080p</p>
                                <p className='sub-p'>Unbranded Mount</p>
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
        </>
    )
}

export default About;