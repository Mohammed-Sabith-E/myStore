import React, { useEffect, useState } from 'react'
import './Account.css'
import Header from '../../components/header/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Account() {
    const [userData, setUserData] = useState([]);
    const authToken = localStorage.getItem('authToken')
    const navigate = useNavigate()


    useEffect(() => {
        async function fetchUser() {
            await axios.get('http://localhost:5000/api/user/userData', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then(response => {
                    setUserData(response.data)
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }
        fetchUser()
    });

    function handleLogout() {
        localStorage.removeItem('authToken')
        navigate('/products')
    }
    return (
        <div className='account'>
            <Header />
            {/* if no user then don't display user data */}
            {userData
                ? <div className='user-details'>
                    <h1>Welcome {userData.name}!</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{userData.name}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{userData.email}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                // else no data to be displayed
                : ''
            }
        </div >
    )
}

export default Account