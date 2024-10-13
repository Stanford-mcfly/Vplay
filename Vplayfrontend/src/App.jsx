import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Video from './components/video';

function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  const goToVideo = () => {
    navigate('/video');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={goToLogin}>Go to Login</button>
      <button onClick={goToSignup}>Go to Signup</button>
      <button onClick={goToVideo}>Go to VideouploadPage</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/video" element={< Video/>} />
      </Routes>
    </Router>
  );
}

export default App;