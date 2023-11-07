import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const form = document.querySelector("form");

  function handleSignInButton(e) {
    e.preventDefault()
    axios.post('http://localhost:5000/api/user/login', { email, password })
      .then(result => {
        const authToken = result.data.token;

        // Store the token in local storage.
        localStorage.setItem('authToken', authToken);
        navigate("/products");
      })
      .catch(err => {
        console.log(err)
        setError(true)
        form.style.marginTop = "35px";
        setTimeout(() => {
          setError(false)
          form.style.marginTop = "75px";
        }, 3000);
      })
  }

  function handleSignUpButton() {
    navigate("/register");
  }

  return (
    <div className='signin'>
      <div className='signin-container'>
        {/* Container Left Side */}
        <div className="signin-container-left">
          <h1>Sign in</h1>
          {error
            ? <p>Invalid Credentials</p>
            : ''
          }
          <form onSubmit={handleSignInButton}>
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
            <button type='submit'>SIGN IN</button>
          </form>
        </div>

        {/* Container Right Side */}
        <div className="signin-container-right">
          <h1>Hello, Friend!</h1>
          <p>Join the shopping revolution! Register today to unlock exclusive deals</p>
          <button onClick={handleSignUpButton}>SIGN UP</button>
        </div>
      </div>
    </div>
  )
}

export default Login