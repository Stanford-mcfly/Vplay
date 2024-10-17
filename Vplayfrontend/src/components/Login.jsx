import { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo-color.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password }, { withCredentials: true });
      navigate('/home');
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="head">
    <div className="loginContainer">
    <img src={logo} alt="Logo" className="logo" /> 
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        <p>{errorMessage}</p>
      </form>
      <Link
        to="/"
        style={{
          color: '#e6af2e',
          textDecoration: 'none',
          marginTop: '10px',
          display: 'inline-block'
        }}
      >
        Don't have an account? Signup
      </Link>
    </div>
    </div>
  );
};

export default Login;
