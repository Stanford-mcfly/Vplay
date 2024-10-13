import { useState } from 'react';
import axios from 'axios';
import './login.css'; // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

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
      <div className="titleContainer">
        <div>Login</div>
      </div>
      <br />
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
        <br />
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
        <br />
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
  );
}

export default Login;