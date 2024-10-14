import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import UploadVideo from './components/UploadVideo';
import WatchVideo from './components/WatchVideo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/video/:filename" element={<WatchVideo />} />
      </Routes>
    </Router>
  );
}

export default App;
