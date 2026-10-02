import { useEffect, useState, useMemo } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { CardOverlay } from './ProjectOverlay'
import { supabase } from '../utils/supabase'
import DOMPurify from 'dompurify'
import { markdownToHtml } from '../utils/markdownParser'

import './styles/DevlogsCardOverlay.css'
import '../styles/Markdown.css'

interface Devlog {
    id: number
    devlogName: string
    devlogDate: string
    devlogImage: string | null
    devlog_content: string
    projects: { projectName: string } | null
}

export function DevlogCardOverlay() {
    const { projectId, id } = useParams()
    const location = useLocation()

    const passedDevlog = location.state?.devlog as Devlog | undefined

    const [projectName, setProjectName] = useState('')
    const [devlogs, setDevlogs] = useState<Devlog[]>([])
    const [selected, setSelected] = useState<Devlog | null>(passedDevlog ?? null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchDevlogs() {
            let query = supabase.from('devlogs').select('*, projects(id, projectName)')

            if (projectId) {
                query = query.eq('project_ref', projectId)
            } else if (id && passedDevlog) {
                query = query.eq('project_ref', (passedDevlog.projects as any)?.id ?? '')
            } else if (id) {
                const { data: single, error: singleError } = await supabase
                    .from('devlogs')
                    .select('*, projects(id, projectName)')
                    .eq('id', id)
                    .single()

                if (singleError || !single) {
                    console.error('Error fetching devlog:', singleError?.message)
                    setLoading(false)
                    return
                }

                setSelected(single as unknown as Devlog)
                query = query.eq('project_ref', (single as any).project_ref)
            }

            const { data, error } = await query.order('devlogDate', { ascending: false })

            if (error) {
                console.error('Error fetching devlogs:', error.message, error.details, error.hint)
                setLoading(false)
                return
            }

            const list = data as unknown as Devlog[]
            setDevlogs(list)

            if (list.length > 0) {
                setProjectName(list[0].projects?.projectName || '')
            }

            setSelected((current) => current ?? list[0] ?? null)
            setLoading(false)
        }

        fetchDevlogs()
    }, [projectId, id])

    const sortedDevlogs = useMemo(() => {
        return [...devlogs].sort(
            (a, b) => new Date(b.devlogDate).getTime() - new Date(a.devlogDate).getTime()
        );
    }, [devlogs]);

    return (
        <CardOverlay>
            <div className="devlog-split">
                <div className="devlog-split-list">
                    <h3 className="devlog-split-heading">{projectName + " Devlogs" || 'Devlogs'}</h3>

                    {loading ? (
                        <p>Loading...</p>
                    ) : sortedDevlogs.length === 0 ? (
                        <p>No devlogs yet.</p>
                    ) : (
                        sortedDevlogs.map((entry) => (
                            <button
                                key={entry.id}
                                className={`devlog-split-item ${selected?.id === entry.id ? 'active' : ''}`}
                                onClick={() => setSelected(entry)}
                            >
                                <span className="devlog-split-item-name">{entry.devlogName}</span>
                                <span className="devlog-split-item-date">{entry.devlogDate}</span>
                            </button>
                        ))
                    )}
                </div>

                <div className="devlog-split-detail">
                    {selected ? (
                        <>
                            {selected.devlogImage && (
                                <img
                                    className="project-overlay-img"
                                    src={selected.devlogImage}
                                    alt={selected.devlogName}
                                />
                            )}
                            <div className='devlog-split-detail-heading'>
                                <h2 id="project-title">{selected.devlogName}</h2>
                                <p id="project-date">{selected.devlogDate}</p>
                            </div>

                            <div
                                id="project-description"
                                className="markdown"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(markdownToHtml(selected.devlog_content || '')),
                                }}
                            />
                        </>
                    ) : (
                        <p>Select a devlog to read it.</p>
                    )}
                </div>
            </div>
        </CardOverlay>
    )
}