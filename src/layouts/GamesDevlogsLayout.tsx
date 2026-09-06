import { Outlet } from "react-router-dom"

import Nav from '../components/Nav'

import './GamesDevlogsLayout.css'

function GamesDevlogsLayout() {
    return (
        <div className="games-devlogs-shell">

            <Nav />

            <Outlet />
        </div>
    )
}

export default GamesDevlogsLayout