import React, { useState } from 'react'

function AdminLogin() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })
    const [error, setError] = useState('')
    const { username, password } = credentials;

    const OnInputChange = (e) => {
        setCredentials({
            ...credentials, [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (username === 'admin' && password === '123') {
            alert('login success')
            window.location.href = '/allitems'
        } else {
            alert('Invalid credentials')
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>

                <label for="username">username</label><br />
                <input type="text" id="username" name="username" onChange={OnInputChange} value={username} required /><br />

                <label for="password">password</label><br />
                <input type="password" id="password" name='password' onChange={OnInputChange} value={password} required /><br />

                <button type="submit" className='fom_btn'>login</button>

            </form>
        </div>
    )
}

export default AdminLogin
