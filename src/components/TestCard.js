// src/components/TestCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestCard = ({ id, title, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/test/${id}`); // Navigate to the test details page
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '16px',
    margin: '10px',
    width: '200px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer', // Indicate that it's clickable
  },
};

export default TestCard;