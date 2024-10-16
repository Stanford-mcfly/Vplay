import { useState  , useEffect } from 'react';
import axios from 'axios';
import './login.css'; // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  
  useEffect(() => {
    // Add class to body to prevent scrolling
    document.body.classList.add('no-scroll');

    // Cleanup function to remove the class when the component is unmounted
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      }, { withCredentials: true });

      if (response.status === 200) {
        setSuccess('Login successful');
        setError('');
        setProfilePicture(response.data.profilePicture); // Set profile picture URL
        // Redirect to another page or perform other actions
      }
    } catch (err) {
      setError('Invalid credentials');
      setSuccess('');
    }
  };

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <div className="titleContainer">Login</div>
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <input
              type="email"
              value={email}
              placeholder="Enter your email here"
              onChange={(e) => setEmail(e.target.value)}
              className="inputBox"
              required
            />
            <label className="errorLabel">{error}</label>
          </div>
          <div className="inputContainer">
            <input
              type="password"
              value={password}
              placeholder="Enter your password here"
              onChange={(e) => setPassword(e.target.value)}
              className="inputBox"
              required
            />
            <label className="errorLabel">{error}</label>
          </div>
          <div className="inputContainer">
            <input className="inputButton" type="submit" value="Log in" />
          </div>
        </form>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {profilePicture && (
          <div className="profileContainer">
            <h3>Profile Picture:</h3>
            <img src={`data:image/jpeg;base64,${profilePicture}`} alt="Profile" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
