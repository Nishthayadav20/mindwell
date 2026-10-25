// src/components/JournalList.js
import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import journalBannerImage from '../assets/moodtracker-banner4.jpg';
import axios from 'axios';
import './JournalList.css';

const JournalList = () => {
  const [entries, setEntries] = useState([]);
  const [newEntryText, setNewEntryText] = useState('');
  const [selectedMoodTag, setSelectedMoodTag] = useState('Peaceful');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  const moodTags = ['Peaceful 🌿', 'Grateful ✨', 'Reflective 🌊', 'Thriving 🌟', 'Vulnerable 🌧️', 'Overwhelmed ⚡'];

  const fetchEntries = () => {
    axios.get('http://localhost:5000/api/journal')
      .then(response => {
        setEntries(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching journal entries:', error);
      });
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleCreateEntry = (e) => {
    e.preventDefault();
    if (!newEntryText.trim()) return;

    setIsSubmitting(true);
    const formattedEntry = `[${selectedMoodTag}] ${newEntryText.trim()}`;

    axios.post('http://localhost:5000/api/journal', { entry: formattedEntry })
      .then(() => {
        setNewEntryText('');
        fetchEntries();
        setSuccessToast('✓ Reflection added to your sanctuary!');
        setTimeout(() => setSuccessToast(''), 3000);
      })
      .catch(err => {
        console.error('Error saving journal entry:', err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const filteredEntries = entries.filter(item => 
    (item.entry || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="journal-sanctuary-page">
      <Banner 
        image={journalBannerImage} 
        title="Journal Sanctuary" 
        subtitle="Your private archive of emotional reflections, daily breakthroughs, and soul notes." 
      />

      <div className="journal-container">
        {/* Top Analytics Bar */}
        <div className="journal-stats-row">
          <div className="jstat-card">
            <span className="jstat-icon">📖</span>
            <div>
              <strong>{entries.length}</strong>
              <small>Total Reflections</small>
            </div>
          </div>
          <div className="jstat-card">
            <span className="jstat-icon">🌿</span>
            <div>
              <strong>{entries.filter(e => (e.sentiment || 0) >= 0).length}</strong>
              <small>Positive & Balanced</small>
            </div>
          </div>
          <div className="jstat-card">
            <span className="jstat-icon">🔒</span>
            <div>
              <strong>Private & Safe</strong>
              <small>Encrypted Locally</small>
            </div>
          </div>
        </div>

        {/* Composer Form Card */}
        <div className="journal-composer-card">
          <div className="composer-header">
            <h3>✍️ Write a Mindful Reflection</h3>
            <p>How is your heart feeling in this exact moment?</p>
          </div>

          <form onSubmit={handleCreateEntry}>
            <div className="mood-tag-selector">
              <span className="tag-label">Mood Vibe:</span>
              <div className="tag-pills">
                {moodTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className={`tag-btn ${selectedMoodTag === tag ? 'active' : ''}`}
                    onClick={() => setSelectedMoodTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className="composer-textarea"
              rows="4"
              placeholder="Unburden your mind freely... What went well today? What are you holding onto? What are you ready to release?"
              value={newEntryText}
              onChange={(e) => setNewEntryText(e.target.value)}
              required
            ></textarea>

            <div className="composer-footer">
              {successToast && <span className="composer-toast">{successToast}</span>}
              <button type="submit" className="composer-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : '💾 Save Reflection (+25 XP)'}
              </button>
            </div>
          </form>
        </div>

        {/* Journal Entries Stream */}
        <div className="journal-stream-section">
          <div className="stream-header">
            <div>
              <h3>Past Reflections & Insights</h3>
              <p>Chronological journey of your thoughts</p>
            </div>

            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search your journal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredEntries.length === 0 ? (
            <div className="empty-journal-box">
              <span className="empty-icon">🍃</span>
              <h4>Your journal is quiet</h4>
              <p>Write your first mindful reflection above or complete a Mood Quiz to see your entries here.</p>
            </div>
          ) : (
            <div className="entries-grid">
              {filteredEntries.map(entry => {
                const sentimentScore = entry.sentiment || 0;
                let sentimentLabel = 'Balanced';
                let sentimentClass = 'neutral';
                if (sentimentScore > 1) {
                  sentimentLabel = 'Uplifting';
                  sentimentClass = 'positive';
                } else if (sentimentScore < -1) {
                  sentimentLabel = 'Deep / Heavy';
                  sentimentClass = 'reflective';
                }

                return (
                  <div key={entry.id} className="entry-card">
                    <div className="entry-card-top">
                      <span className="entry-date">
                        📅 {new Date(entry.createdAt).toLocaleDateString(undefined, { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className={`sentiment-badge ${sentimentClass}`}>
                        {sentimentLabel}
                      </span>
                    </div>

                    <p className="entry-body">{entry.entry}</p>

                    <div className="entry-card-footer">
                      <span className="entry-id-note">Entry #{entry.id}</span>
                      <span className="entry-time">
                        {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
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
