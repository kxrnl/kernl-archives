import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { useAuth } from '../utils/useAuth'
import ImageUploader from '../components/ImageUploader'
import DOMPurify from 'dompurify'
import { markdownToHtml } from '../utils/markdownParser'

import '../styles/Dashboard.css'

type Table = 'projects' | 'devlogs'

const tableConfig = {
    projects: {
        orderBy: 'projectDate',
        imageKey: 'projectImage',
        hasOrderAndFeatured: true,
        fields: [
            { key: 'projectId', label: 'Custom ID', multiline: false, markdown: false },
            { key: 'projectName', label: 'Project Name', multiline: false, markdown: false },
            { key: 'projectDate', label: 'Project Date', multiline: false, markdown: false },
            { key: 'project_description', label: 'Description', multiline: false, markdown: false },
            { key: 'github_link', label: 'Repo Link', multiline: false, markdown: false },
            { key: 'demo_link', label: 'Demo Link', multiline: false, markdown: false },
        ],
        displayFields: ['id', 'projectId', 'projectName', 'projectDate'],
        headers: ['DB ID', 'Custom ID', 'Name', 'Date'],
    },
    devlogs: {
        orderBy: 'devlogDate',
        imageKey: 'devlogImage',
        hasOrderAndFeatured: false,
        fields: [
            { key: 'devlogId', label: 'Custom ID', multiline: false, markdown: false },
            { key: 'devlogName', label: 'Devlog Name', multiline: false, markdown: false },
            { key: 'devlogDate', label: 'Devlog Date', multiline: false, markdown: false },
            { key: 'devlog_content', label: 'Devlog Message', multiline: true, markdown: true },
        ],
        displayFields: ['id', 'devlogId', 'devlogName', 'devlogDate'],
        headers: ['DB ID', 'Custom ID', 'Name', 'Date'],
    },
} as const

function Dashboard() {
    const { session } = useAuth()
    const [table, setTable] = useState<Table>('projects')
    const [rows, setRows] = useState<any[]>([])
    const [form, setForm] = useState<any>({})
    const [editingId, setEditingId] = useState<string | null>(null)

    const config = tableConfig[table]

    // Project <-> Devlog relation
    const [projectsList, setProjectsList] = useState<{ id: number; projectName: string }[]>([])

    useEffect(() => {
        async function fetchProjectsList() {
            const { data, error } = await supabase.from('projects').select('id, projectName')
            if (!error && data) setProjectsList(data)
        }
        fetchProjectsList()
    }, [])

    async function fetchRows() {
        // For devlogs, pull in the linked project's name via the foreign key relationship
        const selectQuery = table === 'devlogs' ? '*, projects(id, projectName)' : '*'

        const { data, error } = await supabase
            .from(table)
            .select(selectQuery)
            .order(config.orderBy, { ascending: false })

        if (error) {
            console.error('Error fetching rows:', error.message, error.details, error.hint)
        }
        setRows(data || [])
    }

    useEffect(() => {
        fetchRows()
        setForm({})
        setEditingId(null)
    }, [table])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        // Strip the joined "projects" object before writing — it's not a real column
        const { projects: _joinedProject, ...formToSave } = form

        if (editingId) {
            const { error } = await supabase.from(table).update(formToSave).eq('id', editingId)
            if (error) console.error('Update error:', error.message, error.details, error.hint)
        } else {
            const { error } = await supabase.from(table).insert(formToSave)
            if (error) console.error('Insert error:', error.message, error.details, error.hint)
        }

        setForm({})
        setEditingId(null)
        fetchRows()
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this entry?')) return
        const { error } = await supabase.from(table).delete().eq('id', id)
        if (error) console.error('Delete error:', error.message, error.details, error.hint)
        fetchRows()
    }

    function handleEdit(row: any) {
        setForm(row)
        setEditingId(row.id)
    }

    function handleNew() {
        setForm({})
        setEditingId(null)
    }

    async function handleLogout() {
        await supabase.auth.signOut()
    }

    // Group devlog rows by their linked project name for display
    const groupedDevlogs =
        table === 'devlogs'
            ? rows.reduce<Record<string, any[]>>((acc, row) => {
                const projectName = row.projects?.projectName || 'Unlinked'
                if (!acc[projectName]) acc[projectName] = []
                acc[projectName].push(row)
                return acc
            }, {})
            : null

    return (
        <div className="dashboard-shell">
            <div className="dashboard-header">
                <legend>{session?.user.email}</legend>
                <button onClick={() => setTable('projects')} disabled={table === 'projects'}>
                    Projects
                </button>
                <button onClick={() => setTable('devlogs')} disabled={table === 'devlogs'}>
                    Devlogs
                </button>
                <button className="logout-btn" onClick={handleLogout}>Log out</button>
            </div>

            <form onSubmit={handleSubmit} className="dashboard-form">
                {config.hasOrderAndFeatured && (
                    <>
                        <input
                            type="number"
                            placeholder="Display Order"
                            value={form.display_order ?? ''}
                            onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
                        />

                        <label className="dashboard-checkbox-label">
                            <input
                                type="checkbox"
                                checked={form.top_project || false}
                                onChange={(e) => setForm({ ...form, top_project: e.target.checked })}
                            />
                            Top project
                        </label>
                    </>
                )}

                {table === 'devlogs' && (
                    <select
                        value={form.project_ref || ''}
                        onChange={(e) => setForm({ ...form, project_ref: Number(e.target.value) })}
                    >
                        <option value="">— Link to project —</option>
                        {projectsList.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.projectName}
                            </option>
                        ))}
                    </select>
                )}

                {config.fields.map((field) =>
                    field.multiline ? (
                        <div key={field.key} className="dashboard-field-group">
                            <textarea
                                placeholder={field.label}
                                value={form[field.key] || ''}
                                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                rows={10}
                            />

                            {field.markdown && (
                                <div className="dashboard-markdown-preview">
                                    <p className="preview-label">Preview</p>
                                    <div
                                        className="markdown"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(markdownToHtml(form[field.key] || '')),
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <input
                            key={field.key}
                            placeholder={field.label}
                            value={form[field.key] || ''}
                            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        />
                    )
                )}

                <ImageUploader
                    value={form[config.imageKey] || ''}
                    onChange={(url) => setForm({ ...form, [config.imageKey]: url })}
                    namePrefix={
                        table === 'projects'
                            ? `${form.projectName || ''}-${form.projectDate || ''}`
                            : `${form.devlogName || ''}-${form.devlogDate || ''}`
                    }
                />

                <div className="dashboard-form-actions">
                    <button type="submit">{editingId ? 'Update' : 'Add'}</button>
                    {editingId && (
                        <button type="button" onClick={handleNew}>
                            Cancel edit
                        </button>
                    )}
                </div>
            </form>

            {table === 'projects' ? (
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            {config.headers.map((header) => (
                                <th key={header}>{header}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id}>
                                {config.displayFields.map((key) => (
                                    <td key={key}>{row[key]}</td>
                                ))}
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(row)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(row.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                // Devlogs grouped by their linked project
                Object.entries(groupedDevlogs || {}).map(([projectName, entries]) => (
                    <div key={projectName} className="dashboard-devlog-group">
                        <h3 className="dashboard-devlog-group-title">{projectName}</h3>
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    {config.headers.map((header) => (
                                        <th key={header}>{header}</th>
                                    ))}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((row) => (
                                    <tr key={row.id}>
                                        {config.displayFields.map((key) => (
                                            <td key={key}>{row[key]}</td>
                                        ))}
                                        <td>
                                            <button className="edit-btn" onClick={() => handleEdit(row)}>Edit</button>
                                            <button className="delete-btn" onClick={() => handleDelete(row.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    )
}

export default Dashboard