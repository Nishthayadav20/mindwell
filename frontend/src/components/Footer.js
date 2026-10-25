// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Crisis Banner Strip - Dedicated to India & Global 24/7 Emergency */}
      <div className="footer-crisis-strip">
        <div className="crisis-content">
          <span className="crisis-pulse"></span>
          <span className="crisis-title">🇮🇳 India 24/7 Crisis & Emergency Support:</span>
          <span className="crisis-desc">
            Tele-MANAS (Govt. of India): <a href="tel:14416" className="crisis-quick-num">14416</a> / <a href="tel:18008914416" className="crisis-quick-num">1800-891-4416</a> (Toll-Free) &nbsp;|&nbsp;
            KIRAN: <a href="tel:18005990019" className="crisis-quick-num">1800-599-0019</a> &nbsp;|&nbsp;
            National Emergency: <a href="tel:112" className="crisis-quick-num">112</a> &nbsp;|&nbsp;
            Vandrevala Foundation: <a href="tel:+919999666555" className="crisis-quick-num">+91 9999 666 555</a>
          </span>
          <Link to="/resources" className="crisis-link">View Full India Directory →</Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Column 1: Brand & Mission */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand-title">
              <strong>EMOVIA</strong>
            </Link>
            <p className="footer-tagline">HEAL AND GROW</p>
            <p className="footer-about">
              A gentle, supportive sanctuary designed for emotional reflection, mood tracking, and personal wellness. Empowering you to embrace every feeling and heal at your own pace.
            </p>
            <div className="footer-badge">
              <span className="badge-dot"></span> Safe & Confidential Space
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-nav">
              <li><Link to="/">Home Sanctuary</Link></li>
              <li><Link to="/mood-tracker">Mood Tracker & Journal</Link></li>
              <li><Link to="/journal-list">Journal Archives</Link></li>
              <li><Link to="/challenges">30-Day Challenges</Link></li>
              <li><Link to="/rewards-hub">Wellness Rewards Hub</Link></li>
              <li><Link to="/resources">Emergency & Resources</Link></li>
            </ul>
          </div>

          {/* Column 3: India Emergency Quick Access */}
          <div className="footer-col india-emergency-col">
            <h4 className="footer-heading">🇮🇳 India Helplines</h4>
            <ul className="footer-helpline-list">
              <li>
                <div className="helpline-item">
                  <span className="helpline-name">Tele-MANAS (NIMHANS/Govt)</span>
                  <a href="tel:14416" className="helpline-phone">14416 (Toll-Free)</a>
                </div>
              </li>
              <li>
                <div className="helpline-item">
                  <span className="helpline-name">KIRAN Mental Health</span>
                  <a href="tel:18005990019" className="helpline-phone">1800-599-0019</a>
                </div>
              </li>
              <li>
                <div className="helpline-item">
                  <span className="helpline-name">National Unified Emergency</span>
                  <a href="tel:112" className="helpline-phone">112 (Police/Ambulance)</a>
                </div>
              </li>
              <li>
                <div className="helpline-item">
                  <span className="helpline-name">Vandrevala Crisis Support</span>
                  <a href="tel:+919999666555" className="helpline-phone">+91 9999 666 555</a>
                </div>
              </li>
              <li>
                <div className="helpline-item">
                  <span className="helpline-name">AASRA Suicide Prevention</span>
                  <a href="tel:+919820466726" className="helpline-phone">+91 98204 66726</a>
                </div>
              </li>
            </ul>
            <Link to="/resources" className="footer-more-helplines">See All Verified India Helplines →</Link>
          </div>

          {/* Column 4: Daily Gentle Affirmation */}
          <div className="footer-col affirmation-col">
            <h4 className="footer-heading">Gentle Reminder</h4>
            <div className="affirmation-card">
              <span className="quote-mark">“</span>
              <p className="affirmation-text">
                You do not have to conquer everything today. Take a deep breath, honor how far you've come, and allow yourself to heal one gentle step at a time.
              </p>
              <span className="affirmation-author">— EMOVIA Daily Mindfulness</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-disclaimer">
          <p>
            <strong>Disclaimer:</strong> EMOVIA is an educational and wellness tracking platform intended to promote mindful habits and emotional self-awareness. It does not offer clinical psychiatric evaluation, diagnosis, or direct psychotherapy. If you or someone you know is in crisis, please seek immediate assistance from a licensed medical practitioner or crisis response center.
          </p>
        </div>
        <div className="footer-copyright-row">
          <p>© 2026 <strong>EMOVIA</strong>. All rights reserved. Crafted with care for mental wellness.</p>
          <div className="footer-sub-links">
            <Link to="/resources">Emergency Support</Link>
            <span>•</span>
            <Link to="/mood-tracker">Mood Insights</Link>
            <span>•</span>
            <Link to="/">Privacy First</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

