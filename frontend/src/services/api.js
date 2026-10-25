// src/services/api.js
import axios from 'axios';

// Detect whether running in local development or deployed on Vercel/Production
export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : '/api');

// Initial sample reflections for a rich first-load experience
const defaultSampleEntries = [
  {
    id: 101,
    entry: '[Peaceful 🌿] Completed 10 minutes of box breathing today. Mind is noticeably calm and centered.',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 102,
    entry: '[Grateful ✨] Morning sunlight walk through the park. Thankful for fresh air and small steps forward.',
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString()
  }
];

// Fetch journal entries with seamless fallback
export const getJournalEntries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/journal`, { timeout: 4000 });
    if (response.data && response.data.length > 0) {
      localStorage.setItem('emovia_journal_entries', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.info('Backend unreachable, using local sanctuary storage.');
  }

  // Fallback to localStorage or default samples
  try {
    const cached = localStorage.getItem('emovia_journal_entries');
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    // ignore
  }

  return defaultSampleEntries;
};

// Add a journal entry with dual sync (API + localStorage)
export const addJournalEntry = async (entryText) => {
  const newEntryObj = {
    id: Date.now(),
    entry: entryText,
    createdAt: new Date().toISOString()
  };

  // 1. Immediately store to browser localStorage
  try {
    const cached = localStorage.getItem('emovia_journal_entries');
    const existing = cached ? JSON.parse(cached) : defaultSampleEntries;
    const updated = [newEntryObj, ...existing];
    localStorage.setItem('emovia_journal_entries', JSON.stringify(updated));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }

  // 2. Sync to backend API if reachable
  try {
    await axios.post(`${API_BASE_URL}/journal`, { entry: entryText }, { timeout: 4000 });
  } catch (err) {
    // Graceful offline fallback
  }

  return newEntryObj;
};

// Sync mood quiz assessment
export const saveMoodAssessment = async (moodName, summaryText) => {
  const record = {
    mood: moodName,
    summary: summaryText,
    savedAt: new Date().toISOString()
  };
  localStorage.setItem('emovia_last_mood', JSON.stringify(record));

  try {
    await axios.post(`${API_BASE_URL}/mood`, { mood: moodName }, { timeout: 3000 });
    await axios.post(`${API_BASE_URL}/journal`, {
      entry: `[Mood Assessment Completed] State: ${moodName}. ${summaryText || ''}`
    }, { timeout: 3000 });
  } catch (err) {
    // Graceful offline
  }
  return record;
};

// Sync challenge activity
export const saveChallengeProof = async (day, proofText) => {
  try {
    await axios.post(`${API_BASE_URL}/challenges/proof`, {
      userId: 1,
      day,
      proof: proofText
    }, { timeout: 3000 });
  } catch (err) {
    // Graceful offline
  }
};
