/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
          await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.token && data.authorid) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('authorid', data.authorid);
                console.log('Logged in successfully -');
              } else {
                console.error('Missing token');
              }
            })
            .catch((err) => {
              console.error('Error during token retrieval:', err);
            });
        } catch (err) {
          console.error('Error during login:', err);
          setErr(err.message);
        }
      };
      

    return (
      <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password" 
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Log in</button>
        </form>
        {err && <p className='errorMessage'>{err}</p>}
        <Link to="/">Go back</Link>
        <p>Don't have an account?</p>
        <Link to="/signup">Signup</Link>
      </>
    )
}

export default Login