import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePicture', profilePicture);

    try {
      await axios.post('http://localhost:5000/signup', formData, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      setErrorMessage('Signup failed');
    }
  };

  return (
    <div className="head">
    <div className="signupContainer">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setProfilePicture(e.target.files[0])}
          accept="image/*"
        />
        <button type="submit">Signup</button>
        <p>{errorMessage}</p>
      </form>
      <Link
        to="/login"
        style={{
          color: '#e6af2e',
          textDecoration: 'none',
          marginTop: '10px',
          display: 'inline-block'
        }}
      >
        Already a user? Login
      </Link>
    </div>
    </div>
  );
};

export default Signup;
