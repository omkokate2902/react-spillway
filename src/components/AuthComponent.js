// src/components/AuthComponent.js
import React from 'react';
import { auth, provider } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthComponent = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info: ", result.user);
      navigate('/profile'); // Redirect to profile page after login
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div>
      <h1>Welcome! Please Log In</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default AuthComponent;