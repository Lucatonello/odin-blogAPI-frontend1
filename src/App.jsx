import { Route, Routes } from 'react-router-dom';
import Posts from './routes/Posts';
import Login from './routes/Login'; 
import Signup from './routes/Signup';
import Newpost from './routes/Newpost';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/newpost" element={<Newpost />} />
    </Routes>
  );
}

export default App;
