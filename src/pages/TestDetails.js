// src/pages/TestDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase'; // Import Firestore
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Header from '../components/Header';


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
    <>


      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header closed-sidebar">
        <Header />
        <div className="app-main">
          <div class="app-main__outer">
            <div class="app-main__inner">
              <div class=" container" style={{ background: '#FAFBFC' }}>
                <div className="p-5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <center>
                    <h2>{test.title}</h2>
                    <p>{test.description}</p>
                  </center>
                  <p>Here all the instructions of the test</p>
                  <ul>
                    <li>Don't look away from camera </li>
                    <li>Don't look away from camera </li>
                    <li>Don't look away from camera </li>
                    <li>Don't look away from camera </li>
                    <li className='text-danger'>Don't look away from camera </li>
                  </ul>


                  <button className='btn btn-success' onClick={handleVerify}>Verify Candidate</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestDetails;