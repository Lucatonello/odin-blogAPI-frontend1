import { useState } from "react";
import { Link } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('username: ', username);
        console.log('password: ', password);

        try {

            const response = await fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                throw new Error('response not okay')
            }
            const result = await response.json();
            console.log('signed up ', result);
        } catch (err) {
            console.error('Error during signup', err);
            setErr(err.message);
        }
    }

    return (
      <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
                type="text" 
                name="username"
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
            <button type="submit">Sign up</button>
        </form>
        {err && <p className='errorMessage'>{err}</p>}
        <Link to="/">Go back</Link>
        <Link to="/login">Log in</Link>
      </>
    )
}
export default Signup