import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Comments from './Comments';
import '../Sidebar.css';

const styles = {
  
  global: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
  },
  body: {
    backgroundColor: '#f0f4f8', // Light gray background
  },
  container: {
    display: 'flex',
    minHeight: '100vh',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#264653', // Dark blue
    padding: '20px',
    color: '#fff',
    boxShadow: '3px 0 10px rgba(0, 0, 0, 0.2)',
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
    textDecoration: 'none',
    color: '#f4a261', // Soft orange
    fontSize: '18px',
    display: 'block',
    padding: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  sidebarLinkHover: {
    backgroundColor: '#2a9d8f', // Teal on hover
  },
  content: {
    flex: 1,
    padding: '40px',
    backgroundColor: '#f0f4f8', // Light gray
  },
  posts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    padding: 0,
    listStyleType: 'none',
  },
  postItem: {
    backgroundColor: '#ffffff', // White for post background
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
    color: '#264653', // Dark blue for headings
  },
  postText: {
    fontSize: '16px',
    color: '#6d6875', // Muted purple for text
  },
  postDate: {
    fontStyle: 'italic',
    marginTop: '10px',
    color: '#8d99ae', // Soft gray for date
  },
  authLinks: {
    marginTop: '40px',
    textAlign: 'center',
  },
  authLink: {
    textDecoration: 'none',
    fontSize: '18px',
    color: '#e76f51', // Orange for links
    margin: '0 10px',
  },
  authLinkHover: {
    color: '#f4a261', // Soft orange on hover
    textDecoration: 'underline',
  },
};

function Posts() {
  const [posts, setPosts] = useState([]);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data);
      }).catch(err => console.error('error fetching data', err));
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setIsAuthenticated(true);
  //   }
  // }, [])
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarHeading}>Navigation</h2>
        <ul style={styles.sidebarList}>
          <li style={styles.sidebarListItem}><Link to="/" style={styles.sidebarLink} onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = ''}>Home</Link></li>
          <li style={styles.sidebarListItem}><Link to="/login" style={styles.sidebarLink} onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = ''}>Login</Link></li>
          <li style={styles.sidebarListItem}><Link to="/signup" style={styles.sidebarLink} onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = ''}>Signup</Link></li>
          <li style={styles.sidebarListItem}><Link to="/about" style={styles.sidebarLink} onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = ''}>About</Link></li>
        </ul>
      </div>

      <div style={styles.content}>
        <ul style={styles.posts}>
          {posts.map((post) => (
            <li key={post.id} style={styles.postItem}>
              <h1 style={styles.postTitle}>{post.title}</h1>
              <hr />
              <p style={styles.postText}>{post.text}</p>
              <p style={styles.postDate}>Created at: {post.addedat}</p>
              <Comments postid={post.id} />
              <Link to={`posts/${post.id}`}>Read more</Link>
            </li>
          ))}
        </ul>

        <div style={styles.authLinks}>
        </div>
      </div>
    </div>
  );
}

export default Posts
