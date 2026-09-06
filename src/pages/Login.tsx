import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'

import bg from '../assets/bg.png'


import '../styles/Login.css'
import '../styles/Inputs.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(error.message)
        } else {
            navigate('/dashboard')
        }
    }

    return (
        <>
            <img className='bg' src={bg}></img>

            <div className="login-shell">
                <form className='login-form' onSubmit={handleLogin}>
                    <h1>Login</h1>
                    {error && <p className="login-error">{error}</p>}
                    <input
                        className='input text'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className='input text'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='button submit' type="submit">Log in</button>
                </form>
            </div></>

    )
}

export default Login