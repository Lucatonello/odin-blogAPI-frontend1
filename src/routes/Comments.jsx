import { useEffect, useState } from 'react'



function Comments({ postid }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [authorid, setAuthorid] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
      const storeadAuthorid = localStorage.getItem('authorid');
      if (storeadAuthorid) {
          setAuthorid(storeadAuthorid);
      }
  }, []);

    useEffect(() => {
      fetch(`http://localhost:3000/posts/${postid}/comments`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setComments(data);
        }).catch(err => console.error('error fetching data', err))
    }, [postid]);

     const handleNewComment = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postid}/comments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ text: newComment, authorid: authorid }),
        }); 
        if (!response.ok) {
          throw new Error('response not ok');
        }
      } catch (err) {
        console.error(err);
      }
     }

     return (
      <>
        <h2 style={styles.commentsHeading}>
          {comments.length !== 0 ? 'Comments' : 'No comments yet'}
        </h2>
        <form onSubmit={handleNewComment} style={styles.commentForm}>
          <label htmlFor="addComment" style={styles.label}>Add a comment</label>
          <textarea
            name="newComment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={styles.textarea}
            rows="4" // Default number of rows
          />
          <button type="submit" style={styles.button}>Comment</button>
        </form>
        <hr style={styles.hr} />
        <ul style={styles.commentsList}>
          {comments.map((comment) => (
            comment.text && comment.text.length > 0 ? (
            <li key={comment.id} style={styles.commentItem}>
              <p style={styles.commentAuthor}>{comment.author}</p>
              <p style={styles.commentText}>{comment.text}</p>
            </li>
            ): null
          ))}
        </ul>
      </>
  );
  
}

const styles = {
  commentsHeading: {
    fontSize: '24px',
    color: '#264653',
    marginBottom: '20px',
    textAlign: 'left',
  },
  commentForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', 
    marginBottom: '20px',
  },
  label: {
    marginBottom: '10px',
    fontSize: '18px',
    color: '#6d6875',
    alignSelf: 'flex-start', 
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #e0e0e0',
    marginBottom: '10px',
    outline: 'none',
    width: '100%', 
    resize: 'vertical', 
    minHeight: '80px', 
  },
  button: {
    backgroundColor: '#2a9d8f',
    color: '#fff',
    padding: '8px 12px', 
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    outline: 'none',
    alignSelf: 'flex-end', 
  },
  hr: {
    margin: '20px 0',
    border: 'none',
    borderTop: '2px solid #e0e0e0',
  },
  commentsList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  commentItem: {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#264653',
    marginBottom: '5px',
  },
  commentText: {
    color: '#6d6875',
    fontSize: '16px',
  },
};


export default Comments;