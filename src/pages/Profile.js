// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { auth, storage, db } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './profile.css'


const Profile = ({ setGetImage }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVerified, setIsVerified] = useState(false)



  useEffect(() => {
    console.log(isVerified)
  }, [isVerified])
  const handleVerifyClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setPreviewImage(null);
  };



  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    setGetImage(e.target.files[0])

  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }
    setUploading(true);
    setError('');

    // Create a storage reference for the image
    const storageRef = ref(storage, `images/${auth.currentUser.uid}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Optional: track upload progress
      },
      (error) => {
        console.error("Upload error: ", error);
        setError("Failed to upload image.");
        setUploading(false);
      },
      async () => {
        // Get the image URL after successful upload
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

        // Store the image URL in Firestore under 'users' collection with userId as document ID
        try {
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          await setDoc(userDocRef, {
            imageUrl: imageUrl,
            isVerified: true, // Add this line

          }, { merge: true });  // Merge true to not overwrite existing data
          setIsVerified(true)

          console.log("Image URL saved to Firestore");

          navigate('/dashboard'); // Redirect to dashboard after successful upload
        } catch (error) {
          console.error("Error saving to Firestore: ", error);
          setError("Failed to save image URL to Firestore.");
        }
        setUploading(false);
      }
    );
  };

  return (
    <div>


      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header closed-sidebar">
        <Header />
        <br /><br />
        <br /><br />

        <div class="container-fluid">
          <div class="row profile">
            <div class="col-md-3">
              <div class="profile-sidebar">

                <div class="profile-userpic ">
                  <img src="https://gravatar.com/avatar/31b64e4876d603ce78e04102c67d6144?s=80&d=https://codepen.io/assets/avatars/user-avatar-80x80-bdcd44a3bfb9a5fd01eb8b86f9e033fa1a9897c3a15b33adfc2649a002dab1b6.png" class="img-responsive" alt="" />
                </div>

                <div class="profile-usertitle">
                  <div class="profile-usertitle-name">
                    UserName
                  </div>
                  <div class="profile-usertitle-job">
                    Organisation
                  </div>
                </div>

                <div class="profile-userbuttons">
                  {isVerified ? <p>Verified!</p> : <button type="button" onClick={handleVerifyClick} class="btn btn-danger btn-sm">Verify Photo</button>
                  }
                </div>
                {isModalOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      <h2>Upload Your Image</h2>

                      <input type="file" accept="image/*"
                        onChange={handleImageChange}
                        style={{ margin: "10px 0" }} />

                      {previewImage && (
                        <div>
                          <img
                            src={previewImage}
                            alt="Selected"
                            style={{
                              width: "100%",
                              maxHeight: "300px",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      )}

                      <div style={{ marginTop: "20px" }}>
                        <button onClick={handleUpload} disabled={uploading}>
                          {uploading ? "Uploading..." : "Upload Image"}
                        </button>
                        <button onClick={handleCloseModal}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}

                <br />



                <div class="portlet light bordered">

                  <div class="row list-separated profile-stat">
                    <div class="col-md-6 col-sm-6 col-xs-6">
                      <div class="uppercase profile-stat-title"> 37 </div>
                      <div class="uppercase profile-stat-text"> Test Attempts </div>
                    </div>

                    <div class="col-md-6 col-sm-6 col-xs-6">
                      <div class="uppercase profile-stat-title"> 6 </div>
                      <div class="uppercase profile-stat-text"> Test Marked </div>
                    </div>
                  </div>


                </div>

              </div>
            </div>
            <div class="col-md-9">
              <div class="profile-content">
                Some user related content goes here...
              </div>
            </div>
          </div>
        </div>
        <h2>Upload Profile Image</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
};

export default Profile;