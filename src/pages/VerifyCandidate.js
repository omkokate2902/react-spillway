// src/pages/VerifyCandidate.js
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';


const VerifyCandidate = ({ userId, getImage }) => {
  const [loading, setLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Access the camera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    startCamera();

    // Cleanup: stop the camera when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // Capture image from the video feed
  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0);
      const imageDataUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageDataUrl); // Store the base64 image
    }
  };

  // Send data to FastAPI backend
  const handleVerify = async () => {
    if (!capturedImage) return;

    setLoading(true);

    try {
      console.log("started...")
      const response = await fetch('http://192.168.84.218:8000/verify_face', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId, // User ID
          imageUrl: getImage, // Image URL from Firestore
          capturedImage: capturedImage, // Base64 encoded captured image
        }),
      });

      console.log("resoponse", response)

      if (response.ok) {
        const data = await response.json();
        console.log('Verification response:', data);
      } else {
        console.error('Failed to send data:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header closed-sidebar">
        <Header />
        <div className="app-main">
          <div class="" style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',


          }}>
            <div class="a">
              <center>
                <h1>Verify Candidate</h1>
              </center>
              <video ref={videoRef} autoPlay style={{ width: '100%', height: '340px' }} />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <center>
                <button onClick={handleCapture} className='px-5 btn btn-warning mx-4'>Capture Image</button>
                {capturedImage && (
                  <div>
                    <h2>Captured Image</h2>
                    <img src={capturedImage} alt="Captured" style={{ width: '200px', height: 'auto' }} />
                  </div>
                )}
                <button onClick={handleVerify} className='px-5 btn btn-success' disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default VerifyCandidate;