// src/pages/TestDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase'; // Import Firestore
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const TestDetails = () => {
  const { id } = useParams();  // Get the test ID from the URL
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTest = async () => {
      const testDocRef = doc(db, 'tests', id);
      const testSnap = await getDoc(testDocRef);

      if (testSnap.exists()) {
        setTest(testSnap.data());
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchTest();
  }, [id]);

  const handleVerify = () => {
    navigate('/verify-candidate'); // Redirect to the verification page
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{test.title}</h2>
      <p>{test.description}</p>
      <button onClick={handleVerify}>Verify Candidate</button>
    </div>
  );
};

export default TestDetails;