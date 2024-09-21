// src/components/TestCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestCard = ({ id, title, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/test/${id}`); // Navigate to the test details page
  };

  return (

    <>

      <div className="col-md-3 mb-4" >
        <div class="card" style={{ overflow: 'hidden' }} onClick={handleClick}>
          <div class="card-body">
            <h5 class="card-title">{title}</h5>

            <p class="card-text" style={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              padding: '10px'
            }}>{description}</p>
            <a href="#" class="btn btn-outline-primary card-link" onClick={handleClick}>View</a>
            {/* <a href="#" class="card-link">Another link</a> */}
          </div>
        </div>
      </div >
      {/* <div style={styles.card} onClick={handleClick}>


        <h3>{title}</h3>
        <p>{description}</p>
      </div> */}
    </>

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