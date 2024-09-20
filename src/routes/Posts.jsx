import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../Sidebar.css';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data);
      }).catch(err => console.error('error fetching data', err));
  }, []);

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
          <li style={styles.sidebarListItem}><Link to="/" style={styles.sidebarLink} onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = ''}>Home</Link></li>
          <li style={styles.sidebarListItem}><Link to="/login" style={styles.sidebarLink} onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = ''}>Login</Link></li>
          <li style={styles.sidebarListItem}><Link to="/signup" style={styles.sidebarLink} onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = ''}>Signup</Link></li>
          <li style={styles.sidebarListItem}><button style={styles.logoutButton} onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = '#ff4757'} onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>

      <div style={styles.content}>
        <ul style={styles.posts}>
          {posts.map((post) => (
            post.public ? (
              <li key={post.id} style={styles.postItem}>
                <h1 style={styles.postTitle}>{post.title}</h1>
                <hr />
                <p style={styles.postText}>{post.text}</p>
                <p style={styles.postDate}>Created at: {post.addedat}</p>
                <p style={styles.postDate}>Written by: {post.author}</p>
                <Link to={`posts/${post.id}`} style={styles.link}>Read more</Link>
              </li>
            ) : null 
          ))}
        </ul>

        <div style={styles.authLinks}>
        </div>
      </div>
    </div>
  );
}

const styles = {
  
  global: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
  },
  body: {
    backgroundColor: '#f0f4f8', 
  },
  container: {
    display: 'flex',
    minHeight: '100vh',
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
  logoutButton: {
    backgroundColor: '#ff4757', 
    color: '#ffffff', 
    padding: '10px 20px', 
    border: 'none', 
    borderRadius: '5px', 
    fontSize: '16px', 
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
},
  sidebarLinkHover: {
    backgroundColor: '#2a9d8f', 
  },
  content: {
    flex: 1,
    padding: '40px',
    backgroundColor: '#f0f4f8', 
  },
  posts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    padding: 0,
    listStyleType: 'none',
  },
  postItem: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  postItemHover: {
    transform: 'translateY(-5px)',
  },
  postTitle: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#264653', 
  },
  postText: {
    fontSize: '16px',
    color: '#6d6875', 
    display: '-webkit-box', 
    WebkitBoxOrient: 'vertical', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    WebkitLineClamp: 6, 
    lineClamp: 6,
    maxHeight: '9em', 
    marginTop: '10px', 

  },
  postDate: {
    fontStyle: 'italic',
    marginTop: '10px',
    color: '#8d99ae', 
  },
  authLinks: {
    marginTop: '40px',
    textAlign: 'center',
  },
  authLink: {
    textDecoration: 'none',
    fontSize: '18px',
    color: '#e76f51', 
    margin: '0 10px',
  },
  authLinkHover: {
    color: '#f4a261', 
    textDecoration: 'underline',
  },
};

export default Posts
