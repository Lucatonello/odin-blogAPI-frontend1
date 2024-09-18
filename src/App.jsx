import { Route, Routes } from 'react-router-dom';
import Posts from './routes/Posts';
import Login from './routes/Login'; 
import Signup from './routes/Signup';
import Viewpost from './routes/Viewpost';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/posts/:id" element={<Viewpost />} />
    </Routes>
  );
}

export default App;
