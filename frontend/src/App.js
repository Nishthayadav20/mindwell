// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import MoodTrackerPage from './components/MoodTrackerPage';
import Challenges from './components/Challenges';
import RewardsHub from './components/RewardsHub';
import Resources from './components/Resources';
import Footer from './components/Footer';
import JournalList from './components/JournalList';
import EmergencyModal from './components/EmergencyModal';
import Saviour from './components/Saviour';
import LoginModal from './components/LoginModal';
import MemberLockGate from './components/MemberLockGate';
import { AuthProvider, useAuth } from './context/AuthContext';

import journalBanner from './assets/moodtracker-banner4.jpg';
import challengesBanner from './assets/challenges-banner.jpg';
import rewardsBanner from './assets/rewards-banner.jpg';

import './App.css';

const NavigationBar = () => {
  const { user, isMember, logout, openLoginModal } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleRestrictedNav = (e, path, sectionTitle) => {
    closeMenu();
    if (!isMember) {
      e.preventDefault();
      openLoginModal(path, `Please log in to access the ${sectionTitle}.`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-logo" onClick={closeMenu}><strong>EMOVIA</strong></Link>
      </div>

      <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li>
          <Link 
            to="/mood-tracker" 
            onClick={(e) => handleRestrictedNav(e, '/mood-tracker', 'Mood Tracker')}
            title={isMember ? "Open Mood Tracker" : "Log in to access Mood Tracker"}
          >
            Mood Tracker
          </Link>
        </li>
        <li>
          <Link 
            to="/journal-list" 
            onClick={(e) => handleRestrictedNav(e, '/journal-list', 'Journal List')}
            title={isMember ? "Open Journal Sanctuary" : "Log in to access Journal List"}
          >
            Journal List
          </Link>
        </li>
        <li>
          <Link 
            to="/challenges" 
            onClick={(e) => handleRestrictedNav(e, '/challenges', '30-Day Growth Garden')}
            title={isMember ? "Open 30-Day Challenges" : "Log in to access Challenges"}
          >
            Challenges
          </Link>
        </li>
        <li>
          <Link 
            to="/rewards-hub" 
            onClick={(e) => handleRestrictedNav(e, '/rewards-hub', 'Rewards Hub')}
            title={isMember ? "Open Rewards Hub" : "Log in to access Rewards Hub"}
          >
            Rewards Hub
          </Link>
        </li>
        {/* Resources is accessible to all */}
        <li>
          <Link to="/resources" onClick={closeMenu} title="Browse Mental Health Resources (Open to All)">
            Resources
          </Link>
        </li>
        {/* Saviour section is accessible to all */}
        <li>
          <Link to="/saviour" onClick={closeMenu} className="nav-link-saviour" title="Open Emergency Lifeline (Open to All)">
            ⚡ Saviour
          </Link>
        </li>
      </ul>

      {/* Top Right Corner Auth Controls & Mobile Toggle */}
      <div className="nav-right-actions">
        <div className="nav-auth-section">
          {isMember ? (
            <>
              <span className="nav-user-chip member">
                👤 {user?.name || 'Member'}
              </span>
              <button 
                type="button" 
                className="nav-logout-btn" 
                onClick={() => {
                  logout();
                  closeMenu();
                  navigate('/');
                }}
                title="Log out of session"
              >
                Log Out
              </button>
            </>
          ) : (
            <button 
              type="button" 
              className="nav-login-btn" 
              onClick={() => {
                closeMenu();
                openLoginModal('/', 'Log in with your credentials to access member features.');
              }}
              title="Log in with your account"
            >
              🔐 Log In
            </button>
          )}
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button 
          type="button" 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Backdrop for closing mobile drawer when tapping outside */}
      {isMobileMenuOpen && (
        <div 
          className="nav-backdrop" 
          onClick={closeMenu} 
          aria-hidden="true" 
        />
      )}
    </nav>
  );
};

const AppContent = () => {
  return (
    <div>
      <NavigationBar />
      <Routes>
        {/* Sections accessible to all */}
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/saviour" element={<Saviour />} />

        {/* Member-only sections (Mood Tracker, Journal, Challenges, Rewards) */}
        <Route path="/mood-tracker" element={<MoodTrackerPage />} />

        <Route 
          path="/journal-list" 
          element={
            <MemberLockGate 
              sectionName="Journal Sanctuary" 
              bannerImage={journalBanner}
              bannerTitle="Journal Sanctuary"
              bannerSubtitle="Expressive Emotional Healing & Private Reflection Composer"
            >
              <JournalList />
            </MemberLockGate>
          } 
        />

        <Route 
          path="/challenges" 
          element={
            <MemberLockGate 
              sectionName="30-Day Growth Garden" 
              bannerImage={challengesBanner}
              bannerTitle="30-Day Growth Garden"
              bannerSubtitle="Daily Mindfulness Matrix & Streak Tracker"
            >
              <Challenges />
            </MemberLockGate>
          } 
        />

        <Route 
          path="/rewards-hub" 
          element={
            <MemberLockGate 
              sectionName="Wellness Rewards Hub" 
              bannerImage={rewardsBanner}
              bannerTitle="Wellness Rewards Hub"
              bannerSubtitle="XP Balance, Badges & Mindful Perks"
            >
              <RewardsHub />
            </MemberLockGate>
          } 
        />
      </Routes>
      <Footer />
      <EmergencyModal />
      <LoginModal />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
