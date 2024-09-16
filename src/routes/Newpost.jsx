import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Newpost() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [authorid, setAuthorid] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const storeadAuthorid = localStorage.getItem('authorid');
        if (storeadAuthorid) {
            setAuthorid(storeadAuthorid);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, text, authorid }),
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
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
                type='text'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="text">Text</label>
            <input
                type='text'
                name='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type='submit'>Post</button>
        </form>
        <Link to="/">Go back</Link>
      </>
    )
}

export default Newpost;