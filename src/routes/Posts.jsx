import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Comments from './Comments';

function Posts() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data);
      }).catch(err => console.error('error fetching data', err));
  }, []);
  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h1>{post.title}</h1>
            <hr />
            <p>{post.text}</p>
            <p>Created at: {post.addedat}</p>
            <Comments postid={post.id} />
          </li>
        ))}
      </ul>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </>
  )
}

export default Posts
