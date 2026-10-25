import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = ({ refresh }) => {
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = () => {
    axios.get('http://localhost:5000/api/recommendations')
      .then(response => {
        setRecommendations(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching recommendations!', error);
      });
  };

  useEffect(() => {
    fetchRecommendations();
  }, [refresh]); // Fetch recommendations when the component mounts or when the refresh flag changes

  return (
    <div>
      <h3>Recommendations</h3>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: rec }}></li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
