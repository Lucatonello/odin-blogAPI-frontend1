import { useState } from 'react'
import { Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Response not ok -', response);
            }
            const result = await response.json();
            console.log('Logged in succesfully - ', result);
        } catch (err) {
            console.error('Error during login:', err);
            setErr(err.message);
        }
    }

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