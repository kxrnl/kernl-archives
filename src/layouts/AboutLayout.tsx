import { Outlet, Link } from "react-router-dom"

function AboutLayout() {
    return (
        <>
            <div className="first">
                <Link to="/"><img src="../assets/logo-white-transparent.png" />
                    <p style={{ textAlign: "center" }}>click me to go back</p>
                </Link>

            </div>

            <h1 id="aboutcenterlabel">ABOUT US</h1>

            <div className="second">
                <section className="about-content">
                    <div className="about-block">
                        <h2>Who We Are</h2>
                        <p><strong>0X Group</strong> is an indie game studio and collective built by a small team who refused to
                            wait for
                            permission to make something real. We design, develop, and publish our own games — handling
                            everything from the first line of code to the final release.</p>
                    </div>

                    <div className="about-block">
                        <h2>How It Started</h2>
                        <p><strong>0X Group</strong> didn't start with a business plan. It started with a group of people who
                            kept building
                            things together and eventually decided to make it official. Sometime in 2025, we stopped calling it
                            a hobby and started calling it a studio.</p>
                        <p>We're small on purpose. No corporate layers, no committees — just a tight team that moves fast,
                            argues about game feel at 2am, and ships things we're actually proud of.</p>
                    </div>

                    <div className="about-block">
                        <h2>Where We're Going</h2>
                        <p>We're early. Our catalog is young and our story is still being written. But every game we put out is
                            a step toward building something that lasts — a studio with its own identity, its own worlds, and
                            its own audience.</p>
                        <p>We're <strong>0X Group</strong>. We're just getting started.</p>
                    </div>
                </section>
            </div>


            <Outlet />
        </>
    )
}

export default AboutLayout