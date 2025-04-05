import axios from 'axios';
import React, { use, useEffect, useState } from 'react'

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //get user id from local storage
        const userId = localStorage.getItem('userId');
        // if there is no userID , you can redirect to show an error
        if (!userId) {
            setError('User not logged in');
            setLoading(false);
            return;
        }
        // fech user data from API
        axios.get(`http://localhost:8080/user/${userId}`)
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching user data');
                setLoading(false);
            });
    }, []);
    const UpdateNavigate = (id) => {
        window.location.href = `/updateprofile/${id}`;
    }


    //delete function
    const deleteAccount = async () => {
        //display confirmation dialog
        const confirmation =
            window.confirm('Are you sure you want to delete this account?');
        if (confirmation) {
            try {
                //send delete request
                await axios.delete(`http://localhost:8080/user/${user.id}`);
                //success alert
                alert('Account deleted successfully');
                //remove user data from local storage
                localStorage.removeItem('userId');
                //redirect to register page
                window.location.href = '/';
            }catch (error) {
                //error alert
                alert('Error deleting account');
            }
         }
    }
    if (loading) return <p>Loading...</p>; //loading
    if (error) return <p>{error}</p>; //error
    return (
        <div>
            <h2>User profile</h2>
            {user ? (
                <div>
                    <p>Full name : {user.fullname}</p>
                    <p>email : {user.email}</p>
                    <p>password : {user.password}</p>
                    <p>phone : {user.phone}</p>
                    <button onClick={() => UpdateNavigate(user.id)}>Update</button>
                    <button onClick={() => deleteAccount(user.id)}>delete</button>
                </div>
            ) : (
                <p>no user found</p>
            )}
        </div>
    )
}

export default UserProfile
