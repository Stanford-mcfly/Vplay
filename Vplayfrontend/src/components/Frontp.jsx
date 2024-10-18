import React, { useEffect } from 'react';
import './frontp.css';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Initialize the Vanta effect
  useEffect(() => {
    const backgroundEffect = HALO({
      el: "#vanta-background",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      THREE,
    });

    return () => {
      if (backgroundEffect) backgroundEffect.destroy();
    };
  }, []);

  // Separate function to handle navigation
  const handleGetStarted = () => {
    navigate('/home'); // Programmatically navigate to the home page
  };

  return (
    <div className="home-page">
      <div id="vanta-background"></div>
      <div className="home-content">
        <h1>AI Assistant for Developers</h1>
        <p>
          Boost your productivity with our AI tool. Experience the power of AI-assisted coding and automated testing.
        </p>
        <button className="home-cta-button" onClick={handleGetStarted}>
          Get started
        </button>
      </div>
    </div>
  );
};

export default Home;
