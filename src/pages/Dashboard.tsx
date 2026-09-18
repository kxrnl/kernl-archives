import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { useAuth } from '../utils/useAuth'
import ImageUploader from '../components/ImageUploader'

import '../styles/Dashboard.css'

type Table = 'projects' | 'devlogs'

// Field config per table — text fields only; image is handled separately via ImageUploader
const tableConfig = {
    projects: {
        orderBy: 'projectDate',
        imageKey: 'projectImage',
        fields: [
            { key: 'projectId', label: 'Custom ID' },
            // { key: 'display_order', label: 'Display Order' },
            { key: 'projectName', label: 'Project Name' },
            { key: 'projectDate', label: 'Project Date' },
            { key: 'project_description', label: 'Description' },
            { key: 'github_link', label: 'Repo Link' },
            { key: 'demo_link', label: 'Demo Link' },

        ],
        displayFields: ['id', 'projectId', 'display_order', 'projectName', 'projectDate', 'project_description', 'github_link', 'demo_link'],
    },
    devlogs: {
        orderBy: 'devlogDate',
        imageKey: 'devlogImage',
        fields: [
            { key: 'devlogId', label: 'Custom ID' },
            { key: 'devlogName', label: 'Devlog Name' },
            { key: 'devlogDate', label: 'Devlog Date' },
        ],
        displayFields: ['id', 'devlogId', 'devlogName', 'devlogDate'],
    },
} as const

function Dashboard() {
    const { session } = useAuth()
    const [table, setTable] = useState<Table>('projects')
    const [rows, setRows] = useState<any[]>([])
    const [form, setForm] = useState<any>({})
    const [editingId, setEditingId] = useState<string | null>(null)

    const config = tableConfig[table]

    async function fetchRows() {
        const { data, error } = await supabase
            .from(table)
            .select('*')
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

        if (editingId) {
            const { error } = await supabase.from(table).update(form).eq('id', editingId)
            if (error) console.error('Update error:', error.message, error.details, error.hint)
        } else {
            const { error } = await supabase.from(table).insert(form)
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
                <button className='logout-btn' onClick={handleLogout}>Log out</button>
            </div>

            <form onSubmit={handleSubmit} className="dashboard-form">
                {/* Display order */}
                <input
                    type="number"
                    placeholder="Display Order"
                    value={form.display_order ?? ''}
                    onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
                />

                {config.fields.map((field) => (
                    <input
                        key={field.key}
                        placeholder={field.label}
                        value={form[field.key] || ''}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    />
                ))}

                <label className="dashboard-checkbox-label">
                    <input
                        type="checkbox"
                        checked={form.top_project || false}
                        onChange={(e) => setForm({ ...form, top_project: e.target.checked })}
                    />
                    Top project
                </label>

                <ImageUploader
                    value={form[config.imageKey] || ''}
                    onChange={(url) => setForm({ ...form, [config.imageKey]: url })}
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

            <table className="dashboard-table">
                <tbody>
                    <th>DB_ID</th>
                    <th>CustomID</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Actions</th>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            {config.displayFields.map((key) => (
                                <td key={key}>{row[key]}</td>
                            ))}
                            <td>
                                <button className='edit-btn' onClick={() => handleEdit(row)}>Edit</button>
                                <button className='delete-btn' onClick={() => handleDelete(row.id)}>Delete</button>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard