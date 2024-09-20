import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Comments from './Comments';
import { useNavigate } from 'react-router-dom';

function Viewpost() {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setData(data[0]);
          }) 
          .catch(err => console.error('error fetching data', err));
    }, [id]);

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('authorid');
  
      navigate('/login');
    };

    return (
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarHeading}>Navigation</h2>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarListItem}>
              <Link 
                to="/" 
                style={styles.sidebarLink}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = ''}
              >
                Home
              </Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link 
                to="/login" 
                style={styles.sidebarLink}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = ''}
              >
                Login
              </Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link 
                to="/signup" 
                style={styles.sidebarLink}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = ''}
              >
                Signup
              </Link>
              <li style={styles.sidebarListItem}><button style={styles.logoutButton} onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = '#ff4757'} onClick={handleLogout}>Logout</button></li>

            </li>
       
          </ul>
        </div>
        <div style={styles.content}>
          <h1 style={styles.title}>{data.title}</h1>
          <hr style={styles.separator} />
          <p style={styles.text}>{data.text}</p>
          <p style={styles.date}>Created at: {data.addedat}</p>
          <p style={styles.date}>Wrote by: {data.author}</p>
          <hr />
          <Comments postid={data.id} />
          <Link 
            to="/" 
            style={styles.link}
            onMouseOver={(e) => e.target.style.color = styles.linkHover.color}
            onMouseOut={(e) => e.target.style.color = styles.link.color}
          >
            Go back
          </Link>
        </div>
      </div>
    );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh', 
    backgroundColor: '#f4f4f9', 
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#264653', 
    padding: '30px 20px',
    color: '#fff',
    boxShadow: '3px 0 15px rgba(0, 0, 0, 0.2)',
    position: 'sticky',  
    top: 0,              
    height: '100vh',      
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  logoutButton: {
    backgroundColor: '#ff4757', 
    color: '#ffffff', 
    padding: '10px 20px',
    border: 'none', 
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
    marginTop: '15px',
},
  sidebarHeading: {
    marginBottom: '20px',
    fontSize: '24px',
    textAlign: 'center',
    color: '#e9c46a',
    letterSpacing: '1px',
  },
  sidebarList: {
    listStyleType: 'none',
    padding: 0,
  },
  sidebarListItem: {
    marginBottom: '15px',
  },
  sidebarLink: {
    color: '#f5a462',
    textDecoration: 'none',
    padding: '12px 15px',
    fontSize: '18px',
    display: 'block',
    borderRadius: '8px',
    transition: 'background-color 0.3s, transform 0.3s', 
  },
  sidebarLinkHover: {
    backgroundColor: '#2a9d8f', 
  },
  content: {
    flex: 1, 
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    margin: '20px',
  },
  title: {
    fontSize: '2.2rem',
    marginBottom: '15px',
    color: '#333',
    fontWeight: '600',
  },
  separator: {
    margin: '15px 0',
    border: '1px solid #ddd',
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#555',
    marginBottom: '20px',
  },
  date: {
    fontSize: '0.9rem',
    color: '#888',
    margin: '10px 0',
  },
  link: {
    display: 'inline-block',
    marginTop: '30px',
    color: '#f5a462',
    textDecoration: 'none',
    fontSize: '1.1rem',
    padding: '8px 12px',
    border: '2px solid #f5a462',
    borderRadius: '5px',
    transition: 'color 0.3s, background-color 0.3s', 
  },
  linkHover: {
    color: '#fff',
    backgroundColor: '#f58742', 
  },
};

export default Viewpost;