// routes/api.js
const express = require('express');
const router = express.Router();
const db = require('../db/sqlite'); // Import the SQLite database connection
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// Endpoint to add a mood entry
router.post('/mood', (req, res) => {
  const { mood } = req.body;
  const result = sentiment.analyze(mood);
  const sentimentScore = result.score;

  // Insert the mood entry into the database
  db.run(`INSERT INTO moodEntries (mood, sentiment) VALUES (?, ?)`, [mood, sentimentScore], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ id: this.lastID }); // Return the ID of the inserted row
  });
});

// Endpoint to get all mood entries
router.get('/mood', (req, res) => {
  db.all(`SELECT * FROM moodEntries ORDER BY createdAt DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows); // Return all mood entries
  });
});

// Endpoint to add a journal entry
router.post('/journal', (req, res) => {
  const { entry } = req.body;
  const result = sentiment.analyze(entry);
  const sentimentScore = result.score;

  // Insert the journal entry into the database
  db.run(`INSERT INTO journalEntries (entry, sentiment) VALUES (?, ?)`, [entry, sentimentScore], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ id: this.lastID }); // Return the ID of the inserted row
  });
});

// Endpoint to get all journal entries
router.get('/journal', (req, res) => {
  db.all(`SELECT * FROM journalEntries ORDER BY createdAt DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows); // Return all journal entries
  });
});

// Endpoint to get recommendations based on sentiment
router.get('/recommendations', (req, res) => {
  db.all(`SELECT sentiment FROM moodEntries ORDER BY createdAt DESC LIMIT 1`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const latestSentiment = rows[0] ? rows[0].sentiment : 0;

    // Define sentiment ranges and fetch recommendations
    const sentimentRanges = [
      { range: '-10 to -5', recommendation: 'Consider taking a walk or doing some mindfulness exercises. Here are some articles: [Article 1](#), [Article 2](#).' },
      { range: '-4 to 0', recommendation: 'It might help to engage in some relaxing activities. Try these exercises: [Exercise 1](#), [Exercise 2](#).' },
      { range: '0 to 5', recommendation: 'Keep up the great work! Here are some inspiring articles: [Article 3](#), [Article 4](#).' },
      { range: '6 to 10', recommendation: 'You seem to be doing great! Here are some fun activities: [Activity 1](#), [Activity 2](#).' }
    ];

    // Find the appropriate recommendation
    const rec = sentimentRanges.find(({ range }) => {
      const [min, max] = range.split(' to ').map(Number);
      return latestSentiment >= min && latestSentiment <= max;
    });

    if (rec) {
      res.status(200).json([rec.recommendation]);
    } else {
      res.status(200).json([]);
    }
  });
});

// Endpoint to get all challenges
router.get('/challenges', (req, res) => {
  db.all(`SELECT * FROM challenges ORDER BY day ASC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows); // Return all challenges
  });
});

// Endpoint to submit proof for a challenge
router.post('/challenges/proof', (req, res) => {
  const { userId, day, proof } = req.body;

  // Insert the proof into the database
  db.run(`INSERT INTO userChallenges (userId, day, proof, status) VALUES (?, ?, ?, ?)`,
    [userId, day, proof, 'pending'], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ id: this.lastID }); // Return the ID of the inserted row
    });
});

// Endpoint to update the status of a challenge
router.put('/challenges/status/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  db.run(`UPDATE userChallenges SET status = ? WHERE id = ?`, [status, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Status updated successfully.' });
  });
});

module.exports = router;
