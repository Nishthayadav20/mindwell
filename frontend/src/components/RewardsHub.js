// src/components/RewardsHub.js
import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import rewardsImage from '../assets/rewards-banner.jpg';
import reward1Image from '../assets/reward1.jpg';
import reward2Image from '../assets/reward2.jpg';
import './RewardsHub.css';

const initialBadges = [
  { id: 'b1', name: 'First Reflection', icon: '🌟', desc: 'Completed your first mood quiz', unlocked: true, date: 'Unlocked' },
  { id: 'b2', name: 'Seed Planter', icon: '🌱', desc: 'Started the 30-Day Growth Garden', unlocked: true, date: 'Unlocked' },
  { id: 'b3', name: 'Green Thumb', icon: '🌿', desc: 'Completed 3 consecutive garden tasks', unlocked: true, date: 'Unlocked' },
  { id: 'b4', name: 'Soul Writer', icon: '✍️', desc: 'Logged 5 mindful journal entries', unlocked: false, progress: 2, total: 5 },
  { id: 'b5', name: 'Zen Master', icon: '🧘', desc: 'Maintained a 7-day wellness streak', unlocked: false, progress: 3, total: 7 },
  { id: 'b6', name: 'Full Blossom', icon: '👑', desc: 'Complete all 30 days of the Garden', unlocked: false, progress: 3, total: 30 }
];

const initialPerks = [
  {
    id: 'p1',
    name: '15-Minute Binaural Rain Audio Track',
    category: 'Audio Meditation',
    cost: 100,
    claimed: false,
    image: reward2Image,
    description: 'Immersive 432Hz theta-wave rain recording engineered for somatic relaxation and deep sleep.'
  },
  {
    id: 'p2',
    name: '4K Zen Minimalist Desktop & Phone Wallpapers',
    category: 'Digital Art',
    cost: 150,
    claimed: false,
    image: reward1Image,
    description: 'High-resolution mental wellness artwork curated to bring calm to your device lock screen.'
  },
  {
    id: 'p3',
    name: 'Printable 30-Day Healing Self-Care Guidebook',
    category: 'Workbook',
    cost: 250,
    claimed: false,
    image: reward2Image,
    description: 'Beautiful 24-page PDF featuring daily gratitude prompts, habit trackers, and grounding tools.'
  },
  {
    id: 'p4',
    name: 'Personalized EMOVIA Certificate of Mindfulness',
    category: 'Milestone Honor',
    cost: 500,
    claimed: false,
    image: reward1Image,
    description: 'Custom verified certificate recognizing your dedication to emotional wellness and healing.'
  }
];

const RewardsHub = () => {
  const [coins, setCoins] = useState(280);
  const [perks, setPerks] = useState(initialPerks);
  const [claimToast, setClaimToast] = useState('');
  const [activeModal, setActiveModal] = useState(null);

  // Sync coins with completed challenge days
  useEffect(() => {
    try {
      const storedDays = localStorage.getItem('emovia_completed_days');
      if (storedDays) {
        const completedCount = Object.values(JSON.parse(storedDays)).filter(Boolean).length;
        setCoins(prev => Math.max(prev, 150 + completedCount * 25));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleClaim = (perk) => {
    if (coins < perk.cost && !perk.claimed) {
      setClaimToast(`⚠️ Need ${perk.cost - coins} more XP to unlock! Complete more Garden tasks.`);
      setTimeout(() => setClaimToast(''), 3500);
      return;
    }

    if (!perk.claimed) {
      setCoins(prev => prev - perk.cost);
      setPerks(prev => prev.map(p => p.id === perk.id ? { ...p, claimed: true } : p));
      setClaimToast(`🎉 Unlocked "${perk.name}"!`);
      setTimeout(() => setClaimToast(''), 3500);
    }
    setActiveModal(perk);
  };

  return (
    <div className="rewards-hub-page">
      <Banner 
        image={rewardsImage} 
        title="Wellness Rewards Hub" 
        subtitle="Earn XP by completing your daily mood surveys and 30-Day Garden activities. Redeem rewards for your mental well-being." 
      />

      <div className="rewards-hub-container">
        {/* Tier & Balance Dashboard */}
        <div className="rewards-dashboard-card">
          <div className="tier-info-wrap">
            <span className="tier-badge">Level 2 Mindful Seeker</span>
            <h2 className="tier-title">Your Wellness Energy Balance</h2>
            <p className="tier-sub">Every mindful breath, journal reflection, and completed challenge fuels your progress.</p>
          </div>

          <div className="coins-display-box">
            <span className="coins-icon">🪙</span>
            <div className="coins-count-wrap">
              <span className="coins-number">{coins}</span>
              <span className="coins-label">Wellness XP Available</span>
            </div>
          </div>
        </div>

        {claimToast && (
          <div className="rewards-toast">
            <span>{claimToast}</span>
          </div>
        )}

        {/* Achievement Badges Section */}
        <div className="rewards-section">
          <div className="section-title-row">
            <h3>🏆 Achievement Milestones & Badges</h3>
            <p>Badges unlocked through consistency and emotional self-awareness</p>
          </div>

          <div className="badges-grid">
            {initialBadges.map(badge => (
              <div key={badge.id} className={`badge-card ${badge.unlocked ? 'badge-unlocked' : 'badge-locked'}`}>
                <span className="badge-card-icon">{badge.icon}</span>
                <h4 className="badge-card-name">{badge.name}</h4>
                <p className="badge-card-desc">{badge.desc}</p>
                <div className="badge-status-pill">
                  {badge.unlocked ? (
                    <span className="unlocked-text">✓ {badge.date}</span>
                  ) : (
                    <span className="locked-text">🔒 {badge.progress}/{badge.total} Done</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Redeemable Rewards Store */}
        <div className="rewards-section">
          <div className="section-title-row">
            <h3>🎁 Redeemable Wellness Perks</h3>
            <p>Exchange your earned Wellness XP for calming tools, soundscapes, and workbooks</p>
          </div>

          <div className="perks-grid">
            {perks.map(perk => (
              <div key={perk.id} className="perk-card">
                <div className="perk-img-wrap">
                  <img src={perk.image} alt={perk.name} />
                  <span className="perk-category-pill">{perk.category}</span>
                </div>

                <div className="perk-content">
                  <h4 className="perk-title">{perk.name}</h4>
                  <p className="perk-desc">{perk.description}</p>

                  <div className="perk-action-row">
                    <span className="perk-cost-tag">🪙 {perk.cost} XP</span>
                    <button
                      type="button"
                      className={`perk-btn ${perk.claimed ? 'claimed-btn' : 'claim-btn'}`}
                      onClick={() => handleClaim(perk)}
                    >
                      {perk.claimed ? '✓ Access Perk' : 'Unlock Perk'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for viewing claimed perks */}
        {activeModal && (
          <div className="perk-modal-overlay" onClick={() => setActiveModal(null)}>
            <div className="perk-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="perk-modal-close" onClick={() => setActiveModal(null)}>✕</button>
              <span className="modal-perk-icon">🎁</span>
              <h3>{activeModal.name}</h3>
              <p className="modal-perk-category">{activeModal.category}</p>
              <p className="modal-perk-details">{activeModal.description}</p>
              <div className="modal-perk-success">
                <span>✓</span> This resource is now accessible in your EMOVIA library.
              </div>
              <button type="button" className="modal-done-btn" onClick={() => setActiveModal(null)}>
                Enjoy Your Mindful Perk
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardsHub;
