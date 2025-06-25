import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
    }
  })

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token)
      setToken(res.data.token);

      const decoded = jwtDecode(res.data.token);

      setProfile(decoded)
      alert("Login Successfull")
    } catch (err) {
      alert('Login failed');
    }
  };
  const logout = async () => {
    localStorage.removeItem('token')
    setToken('')
    setProfile(null)
  }
  // console.log(token)

  const getProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProfile(res.data.user);
    } catch (err) {
      alert('Unauthorized');
    }
  };

  const register = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/register', { username, password });
    alert('User Registered successfully...');
    setIsRegistering(false);

  }

  return (
    <div>
      <h2>{isRegistering ? "Registration form" : "Login Form"}</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      {/* <button onClick={login}>Login</button> */}
      {/* <button onClick={getProfile} disabled={!token}>Get Profile</button> */}

      <div>
        {
          isRegistering
            ?
            <>
              <button onClick={register}>Register</button>
              <p>Already have an account?
                <span onClick={() => setIsRegistering(false)}>Login</span>
              </p>
            </>
            :
            <>
              <button onClick={login}>Login</button>
              <p>Dont have an account?
                <span onClick={() => setIsRegistering(true)}>Register</span>
              </p>
            </>
        }
      </div>

      {profile && (
        <div>
          <h3>Welcome, {profile.username}</h3>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )}

      {profile?.role === 'admin' && (
        <div>
          <h4>Admin Panel</h4>
          <button onClick={async () => {
            try{

              const res = await axios.get('http://localhost:5000/api/auth/admin-panel', {
                headers: { Authorization: `Bearer ${token}` }
              })
              alert(res.data.msg)
            } catch{
              alert("Access Denied !")
            }
          }
          }>Access Admin Panel</button>
        </div>
      )}

      <hr />
      {token && <button onClick={getProfile}>Get Profile</button>}
      {token && <button onClick={logout}>Logout</button>}
    </div>
  );
}

export default LoginForm;
