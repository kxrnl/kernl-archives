import { useEffect, useState } from 'react'
import DevlogCard from '../components/DevlogCard'
import { supabase } from '../utils/supabase'

interface Devlog {
    id: number
    devlogId: string
    devlogName: string
    devlogDate: string
    devlogImage: string
}

function Devlogs() {
    const [devlogs, setDevlogs] = useState<Devlog[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchDevlogs() {
            const { data, error } = await supabase
                .from('devlogs')
                .select('*')
                .order('devlogDate', { ascending: false })

            if (error) {
                console.error('Error fetching devlogs:', error.message, error.details, error.hint)
            } else {
                setDevlogs(data)
            }
            setLoading(false)
        }

        fetchDevlogs()
    }, [])

    return (
        <>
            <main>
                <div className="sub-top">DEVLOGS</div>

                <div className="display">
                    <div className="grid">
                        {loading ? (
                            <p>Loading devlogs...</p>
                        ) : (
                            devlogs.map((devlog) => (
                                <DevlogCard
                                    key={devlog.id}
                                    devlogName={devlog.devlogName}
                                    devlogDate={devlog.devlogDate}
                                    devlogImage={devlog.devlogImage}
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Devlogs