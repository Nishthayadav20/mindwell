// src/components/JournalList.js
import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import journalBannerImage from '../assets/moodtracker-banner4.jpg';
import { getJournalEntries, addJournalEntry } from '../services/api';
import './JournalList.css';

const JournalList = () => {
  const [entries, setEntries] = useState([]);
  const [newEntryText, setNewEntryText] = useState('');
  const [selectedMoodTag, setSelectedMoodTag] = useState('Peaceful 🌿');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  const moodTags = ['Peaceful 🌿', 'Grateful ✨', 'Reflective 🌊', 'Thriving 🌟', 'Vulnerable 🌧️', 'Overwhelmed ⚡'];

  const fetchEntries = async () => {
    const data = await getJournalEntries();
    setEntries(data || []);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleCreateEntry = async (e) => {
    e.preventDefault();
    if (!newEntryText.trim()) return;

    setIsSubmitting(true);
    const formattedEntry = `[${selectedMoodTag}] ${newEntryText.trim()}`;

    await addJournalEntry(formattedEntry);
    setNewEntryText('');
    await fetchEntries();
    setSuccessToast('✓ Reflection added to your sanctuary!');
    setIsSubmitting(false);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const filteredEntries = entries.filter(item => 
    (item.entry || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="journal-sanctuary-page">
      <Banner 
        image={journalBannerImage} 
        title="Journal Sanctuary" 
        subtitle="Your private emotional canvas. Record your thoughts, track your sentiments, and cultivate inner peace." 
      />

      <div className="journal-sanctuary-container">
        {successToast && (
          <div className="journal-toast">
            {successToast}
          </div>
        )}

        {/* Reflection Composer */}
        <div className="journal-composer-card">
          <h3 className="composer-title">✍️ New Reflection</h3>
          <p className="composer-sub">How is your heart feeling in this exact moment?</p>

          <form onSubmit={handleCreateEntry}>
            <div className="mood-tag-selector">
              <span className="mood-tag-label">Current Energy:</span>
              <div className="tags-row">
                {moodTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className={`tag-pill-btn ${selectedMoodTag === tag ? 'active' : ''}`}
                    onClick={() => setSelectedMoodTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className="journal-textarea"
              placeholder="Write freely without judgment... What made you smile today? What weighed on your mind? What are you letting go of?"
              rows="4"
              value={newEntryText}
              onChange={(e) => setNewEntryText(e.target.value)}
              required
            />

            <div className="composer-footer">
              <span className="composer-hint">🔒 Fully encrypted & private to your personal session</span>
              <button 
                type="submit" 
                className="submit-reflection-btn"
                disabled={isSubmitting || !newEntryText.trim()}
              >
                {isSubmitting ? 'Saving Reflection...' : '🌱 Save Reflection'}
              </button>
            </div>
          </form>
        </div>

        {/* Entries Stream & Filter */}
        <div className="entries-stream-section">
          <div className="stream-header-bar">
            <div>
              <h3 className="stream-title">📖 Your Reflection Stream</h3>
              <p className="stream-subtitle">A chronological journey through your emotional landscape.</p>
            </div>

            <div className="search-box-wrap">
              <input
                type="text"
                placeholder="Search past reflections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="journal-search-input"
              />
            </div>
          </div>

          {filteredEntries.length === 0 ? (
            <div className="empty-journal-box">
              <span className="empty-icon">🕊️</span>
              <h4>No reflections found</h4>
              <p>Write your first entry above to plant a seed in your reflection sanctuary.</p>
            </div>
          ) : (
            <div className="entries-grid">
              {filteredEntries.map((item, index) => {
                const dateObj = item.createdAt ? new Date(item.createdAt) : new Date();
                const formattedDate = dateObj.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });
                const formattedTime = dateObj.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div key={item.id || index} className="entry-card">
                    <div className="entry-card-header">
                      <span className="entry-chip">Entry #{entries.length - index}</span>
                      <span className="entry-date">{formattedDate} • {formattedTime}</span>
                    </div>

                    <p className="entry-body">{item.entry}</p>

                    <div className="entry-card-footer">
                      <span className="zen-marker">✨ Mindful Moment</span>
                      <span className="entry-saved-pill">✓ Saved</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalList;
