import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [profile, setProfile] = useState(null)

    async function handleLogin(){
        const res = await axios.post('http://localhost:5000/api/auth/login', {username, password})
        setToken(res.data.token)
        console.log("Token: ", token)
    }
    async function handleGetProfile(){
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setProfile(res.data.user)
    }
    

  return (
    <div>
        <h2>Login form</h2>
        <input type="text" placeholder='Enter username' onChange={(e)=>setUsername(e.target.value)} />
        <input type="text" placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleGetProfile}>Get Profile</button>

        {profile && (
            <div>
            <div>Welcome {profile.username}</div>
            </div>
        )}
    </div>
  )
}

export default LoginForm