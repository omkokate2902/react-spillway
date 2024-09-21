// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Import your Firestore configuration
import TestCard from '../components/TestCard';
import Header from '../components/Header';


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


      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header closed-sidebar">
        <Header />
        <div className="app-main">
          <div class="app-main__outer">
            <div class="app-main__inner">
              <div class="app-page-title">
                <div class="page-title-wrapper">
                  <div class="page-title-heading">
                    <div class="page-title-icon">
                      <i class="fa fa-user-o" aria-hidden="true"></i>
                    </div>
                    <div>
                      Welcome User!
                      <div class="page-title-subheading">
                        Let's explore our platfrom
                      </div>
                    </div>
                  </div>
                  <div class="page-title-actions">
                    <button
                      type="button"
                      data-toggle="tooltip"
                      title="Example Tooltip"
                      data-placement="bottom"
                      class="btn-shadow mr-3 btn btn-dark"
                    >
                      <i class="fa fa-star"></i>
                    </button>
                    <div class="d-inline-block dropdown">
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        class="btn-shadow  btn btn-info"
                      >
                        <span class="btn-icon-wrapper pr-2 opacity-7">
                          <i
                            class="fa fa-question-circle"
                            aria-hidden="true"
                          ></i>
                        </span>
                        Support
                      </button>
                    </div>
                  </div>


                </div>
                {/* <button >Create Exam</button> */}


                <center><h1>Explore Our test libary</h1>
                  <p>here you will find most secure and unique way of exams </p>
                </center><br />
                <div className="col-lg-12">
                  <form action="" style={{ display: 'flex' }}>
                    <input type="text" className='form-control rounded mx-3' placeholder='Search Somthing' />
                    <button className='btn btn-primary'>Search</button>
                  </form>
                </div>
                <br /><br />

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
            </div>
          </div>
        </div>
      </div>



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