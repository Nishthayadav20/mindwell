// src/components/SubmitProof.js
import React, { useState } from 'react';
import axios from 'axios';

const SubmitProof = () => {
  const [userId, setUserId] = useState('');
  const [day, setDay] = useState('');
  const [proof, setProof] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/challenges/proof', { userId, day, proof })
      .then(response => {
        alert('Proof submitted successfully!');
        // Handle success (e.g., clear the form or show a success message)
      })
      .catch(error => {
        console.error('There was an error submitting the proof!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User ID:
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </label>
      <label>
        Day:
        <input type="number" value={day} onChange={(e) => setDay(e.target.value)} />
      </label>
      <label>
        Proof (URL or description):
        <input type="text" value={proof} onChange={(e) => setProof(e.target.value)} />
      </label>
      <button type="submit">Submit Proof</button>
    </form>
  );
};

export default SubmitProof;
