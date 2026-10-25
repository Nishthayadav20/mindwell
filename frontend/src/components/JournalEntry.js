import React, { useState } from 'react';
import axios from 'axios';

const JournalEntry = () => {
  const [entry, setEntry] = useState('');

  const handleEntrySubmit = () => {
    axios.post('http://localhost:5000/api/journal', { entry })
      .then(response => {
        console.log(response.data);
        setEntry(''); // Clear the text area after submission
      })
      .catch(error => {
        console.error('There was an error submitting the journal entry!', error);
      });
  };

  return (
    <div>
      <h3>Journal Entry</h3>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <button onClick={handleEntrySubmit}>Submit</button>
    </div>
  );
};

export default JournalEntry;
