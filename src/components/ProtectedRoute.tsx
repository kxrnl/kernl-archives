import { Navigate } from 'react-router-dom'
import { useAuth } from '../utils/useAuth'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { session, loading } = useAuth()

    if (loading) return <p>Checking session...</p>
    if (!session) return <Navigate to="/login" replace />

    return <>{children}</>
}

export default ProtectedRoute