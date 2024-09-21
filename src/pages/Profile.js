// src/pages/Profile.js
import React, { useState } from 'react';
import { auth, storage, db } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
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
            imageUrl: imageUrl
          }, { merge: true });  // Merge true to not overwrite existing data

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
      <h2>Upload Profile Image</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default Profile;