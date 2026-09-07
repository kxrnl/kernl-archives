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
            { key: 'projectId', label: 'Project ID' },
            { key: 'projectName', label: 'Project Name' },
            { key: 'projectDate', label: 'Project Date' },
        ],
        displayFields: ['projectName', 'projectDate'],
    },
    devlogs: {
        orderBy: 'devlogDate',
        imageKey: 'devlogImage',
        fields: [
            { key: 'devlogId', label: 'Devlog ID' },
            { key: 'devlogName', label: 'Devlog Name' },
            { key: 'devlogDate', label: 'Devlog Date' },
        ],
        displayFields: ['devlogName', 'devlogDate'],
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
                <button onClick={handleLogout}>Log out</button>
            </div>

            <form onSubmit={handleSubmit} className="dashboard-form">
                {config.fields.map((field) => (
                    <input
                        key={field.key}
                        placeholder={field.label}
                        value={form[field.key] || ''}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    />
                ))}

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
                    {rows.map((row) => (
                        <tr key={row.id}>
                            {config.displayFields.map((key) => (
                                <td key={key}>{row[key]}</td>
                            ))}
                            <td>
                                <button onClick={() => handleEdit(row)}>Edit</button>
                                <button onClick={() => handleDelete(row.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard