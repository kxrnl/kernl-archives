import { Link } from 'react-router-dom'
import logo from '../assets/logo-white-transparent.png'
import bg from '../assets/bg.png'

import '../styles/Global.css'
import '../styles/Home.css'

function Home() {
    return (
        <>
            <h1 style={{ display: "none" }}>HOME</h1>
            <img className='bg' src={bg}></img>

            <div className='home-holder'>
                <section className="center">
                    <div>
                        <img src={logo} className="logo"></img>
                    </div>

                    <div className="center-menu">
                        <Link to="/games">
                            <p>games</p>
                        </Link>
                        <Link to="/devlogs">
                            <p>devlogs</p>
                        </Link>
                        <Link to="/about">
                            <p>about</p>
                        </Link>

                    </div>

                    <div className="bottom-main">
                        <p>&copy;KERNL 2026</p>
                        <div></div>
                        {/* <a href="">
                        <p>Link</p>
                    </a> */}
                    </div>
                </section>
            </div>


        </>
    )
}

export default Home;