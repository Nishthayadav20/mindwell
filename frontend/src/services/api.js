// services/api.js
const API_URL = 'http://localhost:5000/api'; // Adjust the URL if necessary

// Add a journal entry
export const addJournalEntry = async (entry) => {
  try {
    const response = await fetch(`${API_URL}/journal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entry }),
    });
    if (!response.ok) {
      throw new Error('Failed to add journal entry');
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

// Get all journal entries
export const getJournalEntries = async () => {
  try {
    const response = await fetch(`${API_URL}/journal`);
    if (!response.ok) {
      throw new Error('Failed to fetch journal entries');
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
