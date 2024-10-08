// src/pages/CreateExam.js
import React, { useState } from 'react';
import { storage, db } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';  // For generating random ID
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';


const CreateExam = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questionPaper, setQuestionPaper] = useState(null);
  const [modelAnswerPaper, setModelAnswerPaper] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFile(file);
    } else {
      setError('Only PDF files are allowed.');
    }
  };

  const handleUpload = async () => {
    if (!title || !description || !questionPaper || !modelAnswerPaper) {
      setError('Please fill in all fields and upload both PDFs.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Upload PDFs to Firebase Storage
      const questionPaperRef = ref(storage, `exams/${uuidv4()}/${questionPaper.name}`);
      const modelAnswerPaperRef = ref(storage, `exams/${uuidv4()}/${modelAnswerPaper.name}`);

      const questionPaperSnap = await uploadBytesResumable(questionPaperRef, questionPaper);
      const modelAnswerPaperSnap = await uploadBytesResumable(modelAnswerPaperRef, modelAnswerPaper);

      const questionPaperUrl = await getDownloadURL(questionPaperSnap.ref);
      const modelAnswerPaperUrl = await getDownloadURL(modelAnswerPaperSnap.ref);

      // Generate random document ID for the test
      const examId = uuidv4();
      const examDocRef = doc(db, 'tests', examId);

      // Save exam data in Firestore
      await setDoc(examDocRef, {
        title,
        description,
        questionPaperUrl,
        modelAnswerPaperUrl
      });

      console.log("Exam created successfully!");
      navigate('/dashboard'); // Redirect to dashboard after upload

    } catch (error) {
      console.error("Error uploading files or saving data: ", error);
      setError("Failed to create exam.");
    }

    setUploading(false);
  };

  return (
    <>
      <div className='app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header closed-sidebar'>
        <Header />
        <div className="app-main">
          <div className="app- container">
            <div className="app- container">
              <div className="app-page-title">

                <br /><br />
                <center><h1>CREATE TEST</h1></center>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form className='form-group'>
                  <h6> Exam Title</h6>
                  <input
                    type="text"
                    placeholder="Exam Title"
                    className='form-control'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <br />
                  <h6> Exam Description</h6>
                  <textarea
                    placeholder="Exam Description"
                    className='form-control'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <br />
                  <div>
                    <h6>Upload Question Paper (PDF)</h6>
                    <input
                      type="file"
                      className='form-control'
                      accept="application/pdf"
                      onChange={(e) => handleFileChange(e, setQuestionPaper)}
                    />
                  </div>
                  <br />
                  <div>
                    <h6>Upload Model Answer Paper (PDF)</h6>
                    <input
                      type="file"
                      className='form-control'
                      accept="application/pdf"
                      onChange={(e) => handleFileChange(e, setModelAnswerPaper)}
                    />
                  </div>
                </form>
                <button className='w-100 p-2 btn btn-primary' onClick={handleUpload} disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Create Exam'}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default CreateExam;