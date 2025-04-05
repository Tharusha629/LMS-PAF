import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: ''
    })
    const { fullname, email, password, phone } = user;

    const onInputChange = async (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        //check email already exists
        const response = await axios.get(`http://localhost:8080/checkEmail?email=${email}`);
        if (response.data) {
            alert("Email already exists")
            window.location.href = "/login";

        } else {
            //id email does not exist
            await axios.post("http://localhost:8080/user", user);
            alert("Registration successful")
            window.location.href = "/login";
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={(e) => onSubmit(e)}>

                <label for="fullname">fullname</label><br />
                <input type="text" id="fullname" name='fullname'
                    onChange={(e) => {
                        const re = /^[A-Za-z\s]*$/;
                        if (re.test(e.target.value)) {
                            onInputChange(e);
                        }
                    }}
                    value={fullname} required />
                <br />

                <label for="email">email</label><br />
                <input type="email" id="email" name="email" onChange={(e) => onInputChange(e)} value={email} required /><br />

                <label for="password">password</label><br />
                <input type="password" id="password" name='password' onChange={(e) => onInputChange(e)} value={password} required /><br />

                <label for="phone">phone</label><br />
                <input
                    required
                    type="text"
                    id="phone"
                    onChange={(e) => {
                        const re = /^[0-9\b]{0,10}$/;
                        if (re.test(e.target.value)) {
                            onInputChange(e);
                        }
                    }}
                    maxLength="10"
                    pattern="[0-9]{10}"
                    title='plase enter exactly 10 digits  .  '
                    value={phone}
                    name="phone" />
                <br />
                <button type="submit" className='fom_btn'>register</button>
                <p>if you don't have account <span onClick={() => (window.location.href = "/login")}>login</span></p>
            </form>
        </div>
    )
}

export default Register
