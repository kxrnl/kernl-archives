import { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import GameCard from '../components/GameCard'
import { supabase } from '../utils/supabase'

import TestCall from '../utils/test'

import '../styles/Games.css'

interface Game {
    id: number
    gameId: string
    gameName: string
    gameDate: string
    gameImage: string
}

function Games() {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchGames() {
            console.log("LOAD GAMES")
            TestCall()

            const { data, error } = await supabase.from('games').select('*')
            console.log('simplified query:', data, error)
            console.log('fetched games:', data)

            if (error) {
                console.error('Error fetching games:', error.message, error.details, error.hint)
            } else {
                setGames(data)
            }
            setLoading(false)
        }

        fetchGames()
    }, [])

    return (
        <>
            <Banner />
            <main>
                <div className="sub-top">EXPLORE</div>
                <div className="display">
                    <div className="grid">
                        {loading ? (
                            <p>Loading games...</p>
                        ) : (
                            games.map((game) => (
                                <GameCard
                                    key={game.id}
                                    gameId={game.gameId}
                                    gameName={game.gameName}
                                    gameDate={game.gameDate}
                                    gameImage={game.gameImage}
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Games