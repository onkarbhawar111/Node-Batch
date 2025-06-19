import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ name: '', age: '' })
  const [editUserId, setEditUserId] = useState(null)
  const apiUrl = "http://localhost:8080"

  async function fetchUsers() {
    const result = await axios.get(`${apiUrl}/api/getUsers`)

    setUsers(result.data)
    console.log(result.data)
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.age) {
      alert('All fields required !')
    }
    if (editUserId) {
      await axios.put(`${apiUrl}/api/updateUser/${editUserId}`, form)
      setEditUserId(null)
    } else {
      await axios.post(`${apiUrl}/api/createUser`, form)
    }

    setForm({ name: '', age: '' })
    fetchUsers()
  }
  
  const handleEdit = (user) => {
    setForm({ name: user.name, age: user.age })
    setEditUserId(user._id)
  }
  
  const handleDelete = async (id) => {
    await axios.delete(`${apiUrl}/api/deleteUser/${id}`)
    fetchUsers()
  }

  return (
    <>
      <div>CRUD APP</div>
      <hr />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter name' name='name' value={form.name} onChange={handleChange} required />
        <input type="number" placeholder='Enter age' name='age' value={form.age} onChange={handleChange} required />
        <button type='submit'>{editUserId ? "Update User" : "Create User"}</button>
      </form>
      <hr />
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name} - {user.age}
            <button onClick={()=>handleEdit(user)}>Edit</button>
            <button onClick={()=>handleDelete(user._id)}>Delete</button>
          </li>
        )
        )}
      </ul>
    </>
  )
}

export default App