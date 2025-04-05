import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
function UpdateProfile() {
    const { id } = useParams();
    const [formData, setFromData] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: '',
    })
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${id}`);
                const itemData = response.data;
                setFromData({
                    fullname: itemData.fullname || '',
                    email: itemData.email || '',
                    password: itemData.password || '',
                    phone: itemData.phone || '',
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    },[id]);

    const onInputChange = (e) => {
        const { name, value } = e.target
        setFromData({ ...formData, [name]: value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/user/${id}`, formData);
            alert('profile update successfuly')
            window.location.href = '/userProfile'
        } catch (error) {
            alert('Error updating data:', error);
        }
    }
    return (
        <div>
            <h1>Update Profile</h1>
            <form onSubmit={onSubmit}>

                <label for="fullname">fullname</label><br />
                <input type="text" id="fullname" name='fullname' onChange={onInputChange} value={formData.fullname} required />
                <br />

                <label for="email">email</label><br />
                <input type="email" id="email" name="email" onChange={onInputChange} value={formData.email} required /><br />

                <label for="password">password</label><br />
                <input type="password" id="password" name='password' onChange={onInputChange} value={formData.password} required /><br />

                <label for="phone">phone</label><br />
                <input type="text" id="phone" onChange={onInputChange} value={formData.phone} name="phone" />
                <br />
                <button type="submit" className='fom_btn'>update</button>

            </form>
        </div>
    )
}

export default UpdateProfile
