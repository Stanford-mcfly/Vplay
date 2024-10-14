import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import UploadVideo from './components/UploadVideo';
import WatchVideo from './components/WatchVideo';
import SubscribedVideos from './components/SubscribedVideos'; // Import SubscribedVideos component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/video/:filename" element={<WatchVideo />} />
        <Route path="/subscribed_videos" element={<SubscribedVideos />} /> {/* Add SubscribedVideos route */}
      </Routes>
    </Router>
  );
}

export default App;
