// src/components/MemberLockGate.js
import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import { useAuth } from '../context/AuthContext';
import './MemberLockGate.css';

const MemberLockGate = ({ sectionName, bannerImage, bannerTitle, bannerSubtitle, children }) => {
  const { isMember, openLoginModal } = useAuth();

  if (isMember) {
    return children;
  }

  return (
    <div className="member-gate-wrapper">
      {bannerImage && (
        <Banner 
          image={bannerImage} 
          title={bannerTitle || sectionName} 
          subtitle={bannerSubtitle || 'Member Protected Sanctuary • Login Required'} 
        />
      )}

      <div className="member-gate-container">
        <div className="member-gate-card">
          <div className="mg-icon-wrap">
            <span>🔒</span>
          </div>

          <span className="mg-badge">Member Access Only</span>
          <h2 className="mg-title">Login Required for {sectionName}</h2>
          <p className="mg-desc">
            To access <strong>{sectionName}</strong>, record your wellness journey, and save your progress, please log in with your account credentials.
          </p>

          <div className="mg-actions">
            <button 
              type="button" 
              className="mg-login-btn"
              onClick={() => openLoginModal(window.location.pathname, `Please log in to access ${sectionName}`)}
            >
              🔐 Log In to Unlock {sectionName}
            </button>

            <Link to="/resources" className="mg-saviour-btn" style={{ borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}>
              📚 Browse Resources (Open to All)
            </Link>

            <Link to="/saviour" className="mg-saviour-btn">
              ⚡ Open Saviour Lifeline (Open to All)
            </Link>
          </div>

          <div className="mg-info-box">
            <strong>🔒 Access Policy:</strong>
            <ul>
              <li><strong>Accessible to All:</strong> <strong>Home</strong>, <strong>Resources</strong>, and emergency <strong>⚡ Saviour</strong> radar.</li>
              <li><strong>Logged-in Members Only:</strong> <strong>Mood Tracker</strong>, <strong>Journal List</strong>, <strong>30-Day Growth Garden</strong>, and <strong>Rewards Hub</strong>.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberLockGate;
