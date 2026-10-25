// src/components/LoginModal.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen: propIsOpen, onClose: propOnClose, targetRedirect }) => {
  const {
    isLoginModalOpen,
    closeLoginModal,
    login,
    loginAsGuest,
    redirectAfterLogin,
    loginPromptMessage
  } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isVisible = propIsOpen !== undefined ? propIsOpen : isLoginModalOpen;
  const handleClose = propOnClose || closeLoginModal;
  const finalRedirect = targetRedirect || redirectAfterLogin || '/mood-tracker';

  if (!isVisible) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    if (!cleanUsername) return;
    
    login(cleanUsername);
    setUsername('');
    setPassword('');
    handleClose();
    navigate(finalRedirect === '/' ? '/mood-tracker' : finalRedirect);
  };

  const handleGuestAccess = () => {
    loginAsGuest();
    setUsername('');
    setPassword('');
    handleClose();
    navigate(finalRedirect === '/resources' || finalRedirect === '/saviour' ? finalRedirect : '/saviour');
  };

  return (
    <div className="login-modal-overlay" onClick={handleClose}>
      <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="login-close-btn" onClick={handleClose} aria-label="Close modal">✕</button>
        
        <div className="login-header">
          <span className="login-brand">EMOVIA</span>
          <h3 className="login-title">Account Login</h3>
          <p className="login-sub">
            {loginPromptMessage || 'Log in with your credentials to access Mood Tracker, Journal, Challenges & Rewards Hub.'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="modal-username">Username or Email</label>
            <input 
              id="modal-username"
              type="text" 
              placeholder="Enter your username or email" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="input-group">
            <label htmlFor="modal-password">Password</label>
            <input 
              id="modal-password"
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">
            🔐 Log In to Account
          </button>
        </form>

        <div className="login-divider">
          <span>OR</span>
        </div>

        <button type="button" className="login-guest-btn" onClick={handleGuestAccess}>
          <span>⚡</span> Continue as Guest (Resources & Saviour)
        </button>

        <p className="login-privacy-note">
          ℹ️ <strong>Access Policy:</strong> <strong>Resources</strong> and <strong>⚡ Saviour</strong> are accessible to everyone. <strong>Mood Tracker</strong>, <strong>Journal Sanctuary</strong>, <strong>Challenges</strong>, and <strong>Rewards Hub</strong> are exclusive to logged-in members.
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
