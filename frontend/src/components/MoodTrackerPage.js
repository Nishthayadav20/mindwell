// src/components/MoodTrackerPage.js
import React from 'react';
import Banner from './Banner';
import moodTrackerImage from '../assets/moodtracker-banner.jpg';
import MoodQuiz from './MoodQuiz';
import MemberLockGate from './MemberLockGate';
import { useAuth } from '../context/AuthContext';
import './MoodTrackerPage.css';

const MoodTrackerPage = () => {
  const { user, logout } = useAuth();

  return (
    <MemberLockGate
      sectionName="Mood Tracker"
      bannerImage={moodTrackerImage}
      bannerTitle="Mindful Mood Assessment"
      bannerSubtitle="10-Question Gamified Reflection Survey • Discover Your True Emotional State"
    >
      <div className="mood-page-wrapper">
        <Banner 
          image={moodTrackerImage} 
          title="Mindful Mood Assessment" 
          subtitle="10-Question Gamified Reflection Survey • Discover Your True Emotional State" 
        />

        {/* Member Status Bar */}
        <div className="mood-auth-strip">
          <div className="mood-user-info">
            <span>👤 Welcome, <strong>{user?.name || 'Mindful Soul'}</strong></span>
            <span className="mood-user-badge">✨ Member</span>
          </div>
          <button 
            type="button" 
            className="mood-logout-btn"
            onClick={logout}
            title="End session"
          >
            Log Out
          </button>
        </div>

        {/* Gamified 10-Question Mood Survey */}
        <MoodQuiz />
      </div>
    </MemberLockGate>
  );
};

export default MoodTrackerPage;
