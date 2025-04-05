import React, { useState } from 'react'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const loginDetails = { email, password };

        try {
            const response = await axios.post('http://localhost:8080/login', loginDetails);
            if (response.data.id) {
                localStorage.setItem('userId', response.data.id)//save user id 
                alert('Login Successful');
                window.location.href = "/userProfile";
            } else {
                alert('Invalid credentials');
            }
        } catch (err) {
            alert('Invalid credentials');
            window.location.href = "/login";

        }
    }
    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>

                <label for="email">email</label><br />
                <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required /><br />

                <label for="password">password</label><br />
                <input type="password" id="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password} required /><br />

                <button type="submit" className='fom_btn'>login</button>
                <p>if you don't have account <span onClick={() => (window.location.href = "/")}>Register</span></p>
                <p>if you don't have account <span onClick={() => (window.location.href = "/adminLog")}>admin</span></p>
            </form>
        </div>
    )
}

export default Login
