// src/components/Challenges.js
import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import challengesImage from '../assets/challenges-banner.jpg';
import challengesData from '../challengesData';
import axios from 'axios';
import './Challenges.css';

const Challenges = () => {
  const [completedDays, setCompletedDays] = useState({});
  const [selectedDay, setSelectedDay] = useState(1);
  const [reflectionInput, setReflectionInput] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // all, completed, pending
  const [celebrationMsg, setCelebrationMsg] = useState('');

  // Load completion state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('emovia_completed_days');
      if (stored) {
        setCompletedDays(JSON.parse(stored));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const totalCompleted = Object.values(completedDays).filter(Boolean).length;
  const progressPercent = Math.round((totalCompleted / 30) * 100);

  // Calculate current streak
  let streak = 0;
  for (let i = 1; i <= 30; i++) {
    if (completedDays[i]) {
      streak++;
    } else {
      break;
    }
  }

  const currentChallenge = challengesData.find(c => c.day === selectedDay) || challengesData[0];
  const isCurrentCompleted = !!completedDays[selectedDay];

  const handleToggleComplete = (day) => {
    const isNowCompleted = !completedDays[day];
    const updated = { ...completedDays, [day]: isNowCompleted };
    setCompletedDays(updated);
    localStorage.setItem('emovia_completed_days', JSON.stringify(updated));

    if (isNowCompleted) {
      setCelebrationMsg(`🎉 Day ${day} Bloomed! +${currentChallenge.points} Garden XP`);
      setTimeout(() => setCelebrationMsg(''), 4000);

      // Save proof / entry to backend
      try {
        axios.post('http://localhost:5000/api/challenges/proof', {
          userId: 1,
          day: day,
          proof: reflectionInput || `Completed Day ${day}: ${currentChallenge.title}`
        }).catch(() => {});
      } catch (err) {
        // ignore
      }
    }
  };

  const getGardenLevel = (count) => {
    if (count >= 30) return { title: "👑 Master Florist", desc: "Full Garden in Radiant Blossom" };
    if (count >= 20) return { title: "🌺 Sanctuary Guardian", desc: "Abundant Wildflowers Blooming" };
    if (count >= 10) return { title: "🌿 Budding Botanist", desc: "Thriving Stems & Tender Leaves" };
    if (count >= 3) return { title: "🌱 Sprout Caretaker", desc: "Fresh Green Shoots Sprouting" };
    return { title: "🌰 Seed Planter", desc: "Planting Your First Intentions" };
  };

  const gardenLevel = getGardenLevel(totalCompleted);

  return (
    <div className="challenges-page">
      <Banner 
        image={challengesImage} 
        title="30-Day Growth Garden" 
        subtitle="Cultivate daily mindfulness. Complete daily activities to turn your garden tiles lush green like LeetCode!" 
      />

      <div className="challenges-container">
        {/* Garden Top Overview & Stats */}
        <div className="garden-dashboard">
          <div className="garden-status-card">
            <div className="garden-level-wrap">
              <span className="garden-level-badge">{gardenLevel.title}</span>
              <h2 className="garden-level-name">{totalCompleted} of 30 Activities Bloomed</h2>
              <p className="garden-level-desc">{gardenLevel.desc}</p>
            </div>

            <div className="garden-progress-container">
              <div className="garden-progress-header">
                <span>Garden Harvest</span>
                <strong>{progressPercent}%</strong>
              </div>
              <div className="garden-progress-track">
                <div 
                  className="garden-progress-bar" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="garden-stats-grid">
            <div className="stat-pill">
              <span className="stat-icon">🔥</span>
              <div className="stat-info">
                <strong>{streak} Days</strong>
                <small>Active Garden Streak</small>
              </div>
            </div>

            <div className="stat-pill">
              <span className="stat-icon">🌿</span>
              <div className="stat-info">
                <strong>{totalCompleted * 25} XP</strong>
                <small>Total Wellness Energy</small>
              </div>
            </div>

            <div className="stat-pill">
              <span className="stat-icon">🌸</span>
              <div className="stat-info">
                <strong>{30 - totalCompleted} Days</strong>
                <small>Seeds Left to Bloom</small>
              </div>
            </div>
          </div>
        </div>

        {celebrationMsg && (
          <div className="garden-celebration-toast">
            <span>{celebrationMsg}</span>
          </div>
        )}

        {/* LeetCode-style Garden Matrix & Day Showcase */}
        <div className="garden-layout">
          {/* Left Column: 30-Day Activity Garden Grid */}
          <div className="garden-grid-panel">
            <div className="panel-header-row">
              <div>
                <h3 className="panel-title">🌱 30-Day Activity Garden</h3>
                <p className="panel-sub">Click any tile to open challenge. Green marks indicate completed activities.</p>
              </div>

              {/* Filter Buttons */}
              <div className="garden-filters">
                <button 
                  className={`gfilter-btn ${filterMode === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterMode('all')}
                >
                  All (30)
                </button>
                <button 
                  className={`gfilter-btn ${filterMode === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilterMode('completed')}
                >
                  Bloomed ({totalCompleted})
                </button>
                <button 
                  className={`gfilter-btn ${filterMode === 'pending' ? 'active' : ''}`}
                  onClick={() => setFilterMode('pending')}
                >
                  Pending ({30 - totalCompleted})
                </button>
              </div>
            </div>

            {/* LeetCode-style contribution grid */}
            <div className="leetcode-garden-grid">
              {challengesData.map(c => {
                const isDone = !!completedDays[c.day];
                const isSelected = selectedDay === c.day;

                if (filterMode === 'completed' && !isDone) return null;
                if (filterMode === 'pending' && isDone) return null;

                return (
                  <button
                    key={c.day}
                    type="button"
                    className={`garden-cell ${isDone ? 'completed-green' : 'empty-cell'} ${isSelected ? 'active-ring' : ''}`}
                    onClick={() => setSelectedDay(c.day)}
                    title={`Day ${c.day}: ${c.title} (${isDone ? 'Bloomed ✓' : 'Pending'})`}
                  >
                    <span className="cell-day">D{c.day}</span>
                    <span className="cell-icon">
                      {isDone ? '✓' : c.plant.split(' ')[0]}
                    </span>
                    {isDone && <span className="cell-bloom-particle"></span>}
                  </button>
                );
              })}
            </div>

            {/* Legend like LeetCode / GitHub */}
            <div className="leetcode-legend">
              <span className="legend-label">Activity Status:</span>
              <div className="legend-items">
                <span className="legend-sample empty-sample"></span>
                <span>Seed Planted</span>
                <span className="legend-sample green-sample"></span>
                <span>Activity Completed (Green)</span>
                <span className="legend-sample active-sample"></span>
                <span>Active Day</span>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Challenge Showcase */}
          <div className="garden-detail-panel">
            <div className="detail-card-header">
              <span className="detail-day-pill">Day {currentChallenge.day} of 30</span>
              <span className="detail-category-badge">{currentChallenge.category}</span>
              <span className="detail-xp-tag">+{currentChallenge.points} XP</span>
            </div>

            <div className="detail-hero">
              <span className="detail-plant-avatar">{currentChallenge.plant}</span>
              <h2 className="detail-title">{currentChallenge.title}</h2>
            </div>

            <div className="detail-task-box">
              <h4>🎯 Today's Mindfulness Task</h4>
              <p>{currentChallenge.task}</p>
            </div>

            <div className="detail-reflection-box">
              <h4>💭 Mindful Reflection</h4>
              <p className="detail-quote">{currentChallenge.reflection}</p>
            </div>

            {/* Reflection Note Input */}
            <div className="detail-input-group">
              <label htmlFor="reflectionNote">Your Journal Note / Proof (Optional):</label>
              <textarea
                id="reflectionNote"
                rows="3"
                placeholder="Share a quick thought, gratitude, or how this activity made you feel..."
                value={reflectionInput}
                onChange={(e) => setReflectionInput(e.target.value)}
              ></textarea>
            </div>

            {/* Complete / Toggle Button */}
            <button
              type="button"
              className={`garden-action-btn ${isCurrentCompleted ? 'btn-bloomed' : 'btn-water'}`}
              onClick={() => handleToggleComplete(currentChallenge.day)}
            >
              {isCurrentCompleted ? (
                <>✓ Day {currentChallenge.day} Bloomed! (Click to Undo)</>
              ) : (
                <>🌱 Water Garden & Mark Activity Complete (+{currentChallenge.points} XP)</>
              )}
            </button>

            {isCurrentCompleted && (
              <p className="bloomed-cheer">
                🌿 Great job! Your garden square is now marked green.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
