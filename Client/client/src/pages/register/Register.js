import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function handleSignUpButton(e) {
    e.preventDefault()
    axios.post('http://localhost:5000/api/user/register', { name, email, password })
      .then(result => {
        const authToken = result.data.token;

        // Store the token in local storage.
        localStorage.setItem('authToken', authToken);
        navigate("/products");
      })
      .catch(err => console.log(err))
  }

  function handleSignInButton() {
    navigate("/login");
  }

  return (
    <div className='signup'>
      <div className='signup-container'>
        {/* Container Left Side */}
        <div className="signup-container-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button onClick={handleSignInButton}>SIGN IN</button>
        </div>

        {/* Container Right Side */}
        <div className="signup-container-right">
          <h1>Sign up</h1>
          <form onSubmit={handleSignUpButton}>
            <input
              type="name"
              name="name"
              placeholder='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>SIGN UP</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register