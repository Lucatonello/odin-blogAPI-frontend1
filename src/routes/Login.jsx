/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

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

                navigate('/');
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
      <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <legend style={styles.legend}>Login</legend>
        <label htmlFor="username" style={styles.label}>Username</label>
        <input 
          type="text" 
          name="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
        />
        <label htmlFor="password" style={styles.label}>Password</label>
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
        />
        <button type="submit" style={styles.button}>Log in</button>
        {err && <p style={styles.errorMessage}>{err}</p>}
      </form>
      <p style={styles.paragraph}>Don't have an account?</p>
      <Link 
        to="/signup" 
        style={styles.link}
        onMouseOver={(e) => e.target.style.color = styles.linkHover.color}
        onMouseOut={(e) => e.target.style.color = styles.link.color}
      >
        Signup
      </Link>
    </div>
    )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
    lineHeight: '1.5',
    minHeight: '100vh',
    background: '#f3f3f3',
    flexDirection: 'column',
    margin: 0,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
    padding: '10px 20px',
    transition: 'transform 0.2s',
    width: '500px',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    width: '100%',
    marginTop: '10px',
    marginBottom: '5px',
    textAlign: 'left',
    color: '#555',
    fontWeight: 'bold',
  },
  input: {
    display: 'block',
    width: '100%',
    marginBottom: '15px',
    padding: '10px',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  button: {
    padding: '15px',
    borderRadius: '10px',
    marginTop: '15px',
    marginBottom: '15px',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    backgroundColor: '#f5a462',
    width: '100%',
    fontSize: '16px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
  },
  paragraph: {
    marginTop: '15px',
    fontSize: '14px',
  },
  link: {
    textDecoration: 'none',
    color: '#f5a462',
    fontSize: '16px',
  },
  linkHover: {
    color: '#388E3C',
  },
  inputFocus: {
    borderColor: '##f5a462',
  },
  legend: {
    fontSize: '24px',
    color: '#f5a462',
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'block', 
  },

};

export default Login