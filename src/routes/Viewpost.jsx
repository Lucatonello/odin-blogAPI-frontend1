import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Comments from './Comments';

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: '100vh', // Full viewport height
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#264653', // Dark blue
      padding: '20px',
      color: '#fff',
      boxShadow: '3px 0 10px rgba(0, 0, 0, 0.2)',
      height: '100vh', // Full viewport height
      flexShrink: 0, // Prevent the sidebar from shrinking
    },
    sidebarHeading: {
      marginBottom: '20px',
      fontSize: '24px',
      textAlign: 'center',
      color: '#e9c46a', // Accent gold
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
      padding: '10px',
      fontSize: '18px',
      display: 'block',
      borderRadius: '5px',
      transition: 'background-color 0.3s',
    },
    sidebarLinkHover: {
      backgroundColor: '#2a9d8f', // A lighter blue-green for hover
    },
    content: {
      flex: 1, // Take up remaining space
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '2rem',
      marginBottom: '10px',
      color: '#333',
    },
    separator: {
      margin: '10px 0',
      border: '1px solid #ddd',
    },
    text: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#555',
    },
    date: {
      fontSize: '0.9rem',
      color: '#888',
      margin: '10px 0',
    },
    link: {
      display: 'inline-block',
      marginTop: '20px',
      color: '#f5a462',
      textDecoration: 'none',
      fontSize: '1rem',
    },
    linkHover: {
      color: '#f58742',
    },
    
  };

function Viewpost() {
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setData(data[0]);
          }) 
          .catch(err => console.error('error fetching data', err));
    }, [id]);

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
            </li>
            <li style={styles.sidebarListItem}>
              <Link 
                to="/about" 
                style={styles.sidebarLink}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = ''}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div style={styles.content}>
          <h1 style={styles.title}>{data.title}</h1>
          <hr style={styles.separator} />
          <p style={styles.text}>{data.text}</p>
          <p style={styles.date}>Created at: {data.addedat}</p>
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

export default Viewpost;