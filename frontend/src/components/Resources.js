// src/components/Resources.js
import React, { useState } from 'react';
import Banner from './Banner';
import resourcesImage from '../assets/resources-banner.jpg';
import indiaEmergencyServices from '../indiaEmergencyData';
import resourcesData from '../resourcesData';
import promptsData from '../promptsData';
import articlesData from '../articlesData';
import videosData from '../videosData';
import workoutsData from '../workoutsData';
import './Resources.css';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Mental Health',
    'Unified Emergency Services',
    'Crisis & Suicide Prevention',
    'Psychosocial Counseling',
    'Women Protection & Safety',
    'Child Care & Emergency Relief'
  ];

  const filteredHelplines = selectedCategory === 'All'
    ? indiaEmergencyServices
    : indiaEmergencyServices.filter(item => 
        item.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  return (
    <div className="resources-page">
      <Banner 
        image={resourcesImage} 
        title="Emergency & Wellness Library" 
        subtitle="Verified 24/7 India crisis helplines, mental health support, and curated healing tools." 
      />

      <div className="resources-container">
        {/* India Emergency Section */}
        <section id="india-emergency" className="emergency-section">
          <div className="emergency-header">
            <div className="emergency-title-row">
              <span className="live-indicator"></span>
              <h2>🇮🇳 India National Emergency & Mental Health Helplines</h2>
            </div>
            <p className="emergency-subtitle">
              If you or someone around you is in immediate danger, distress, or suicidal crisis, reach out to these free, government-verified, and NGO helplines immediately.
            </p>
          </div>

          {/* Quick Action Emergency Pills */}
          <div className="quick-emergency-pills">
            <a href="tel:112" className="pill-item urgent-pill">
              <span className="pill-icon">🚨</span>
              <div className="pill-info">
                <strong>112</strong>
                <small>National All-in-One Emergency</small>
              </div>
            </a>
            <a href="tel:14416" className="pill-item mental-pill">
              <span className="pill-icon">🧠</span>
              <div className="pill-info">
                <strong>14416</strong>
                <small>Tele-MANAS (24/7 Toll-Free)</small>
              </div>
            </a>
            <a href="tel:18005990019" className="pill-item kiran-pill">
              <span className="pill-icon">🌿</span>
              <div className="pill-info">
                <strong>1800-599-0019</strong>
                <small>KIRAN Mental Health</small>
              </div>
            </a>
            <a href="tel:108" className="pill-item ambulance-pill">
              <span className="pill-icon">🚑</span>
              <div className="pill-info">
                <strong>108 / 102</strong>
                <small>Ambulance & Medical</small>
              </div>
            </a>
            <a href="tel:+919999666555" className="pill-item vandrevala-pill">
              <span className="pill-icon">🤝</span>
              <div className="pill-info">
                <strong>9999 666 555</strong>
                <small>Vandrevala 24/7 Counseling</small>
              </div>
            </a>
          </div>

          {/* Filter Bar */}
          <div className="category-filter-bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Helpline Cards Grid */}
          <div className="helpline-grid">
            {filteredHelplines.map(item => (
              <div key={item.id} className="helpline-card">
                <div className="card-top-row">
                  <span className={`badge-pill badge-${item.badge.toLowerCase().replace(/[^a-z]/g, '')}`}>
                    {item.badge}
                  </span>
                  <span className="fee-badge">{item.fee}</span>
                </div>

                <h3 className="card-helpline-name">{item.name}</h3>
                <p className="card-org">{item.organization}</p>
                <p className="card-desc">{item.description}</p>

                <div className="card-meta">
                  <div className="meta-line">
                    <span className="meta-label">🕒 Timing:</span>
                    <span className="meta-val">{item.timing}</span>
                  </div>
                  <div className="meta-line">
                    <span className="meta-label">🗣️ Languages:</span>
                    <span className="meta-val">{item.languages}</span>
                  </div>
                </div>

                <div className="card-action-row">
                  <a href={`tel:${item.dialNumber}`} className="call-btn">
                    📞 Call {item.number}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global & Community Resources */}
        <div className="other-resources-grid">
          {/* Articles */}
          <div className="resource-category-card">
            <h3 className="category-title">📚 Mental Health Articles</h3>
            <ul className="resource-list">
              {articlesData.map(article => (
                <li key={article.id}>
                  <a href={article.link} target="_blank" rel="noopener noreferrer">
                    <span>{article.title}</span>
                    <span className="external-arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Journal Prompts */}
          <div className="resource-category-card">
            <h3 className="category-title">✍️ Guided Journal Prompts</h3>
            <ul className="resource-list">
              {promptsData.map(prompt => (
                <li key={prompt.id}>
                  <a href={prompt.link} target="_blank" rel="noopener noreferrer">
                    <span>{prompt.title}</span>
                    <span className="external-arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Educational Videos */}
          <div className="resource-category-card">
            <h3 className="category-title">🎥 Educational Videos</h3>
            <ul className="resource-list">
              {videosData.map(video => (
                <li key={video.id}>
                  <a href={video.link} target="_blank" rel="noopener noreferrer">
                    <span>{video.title}</span>
                    <span className="external-arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Guided Workouts */}
          <div className="resource-category-card">
            <h3 className="category-title">🧘 Guided Workouts & Breathwork</h3>
            <ul className="resource-list">
              {workoutsData.map(workout => (
                <li key={workout.id}>
                  <a href={workout.link} target="_blank" rel="noopener noreferrer">
                    <span>{workout.title}</span>
                    <span className="external-arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* International Hotlines Reference */}
        <section className="international-hotlines-box">
          <h4>🌍 International & Global Resources</h4>
          <div className="intl-links">
            {resourcesData.map(res => (
              <a key={res.id} href={res.link} target="_blank" rel="noopener noreferrer" className="intl-link">
                {res.title} ↗
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;

