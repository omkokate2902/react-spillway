// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Import your Firestore configuration
import TestCard from '../components/TestCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const testsCollection = collection(db, 'tests');
        const testSnapshot = await getDocs(testsCollection);
        const testList = testSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTests(testList);
      } catch (error) {
        console.error("Error fetching tests: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/create-exam')}>Create Exam</button>
      {loading ? (
        <p>Loading tests...</p>
      ) : (
        <div style={styles.cardContainer}>
          {tests.map((test) => (
            <TestCard key={test.id} id={test.id} title={test.title} description={test.description} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
};

export default Dashboard;