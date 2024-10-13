import { useState } from 'react';
import axios from 'axios';

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
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Login</button>
      </form>
      {profilePicture && (
        <div>
          <h3>Profile Picture:</h3>
          <img src={`data:image/jpeg;base64,${profilePicture}`} alt="Profile" />
        </div>
      )}
    </div>
  );
}

export default Login;