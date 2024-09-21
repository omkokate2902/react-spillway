// src/components/AuthComponent.js
import React from 'react';
import { auth, provider } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthComponent = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info: ", result.user);
      navigate('/profile'); // Redirect to profile page after login
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <>
      <section class="form_page">
        <div class="container">
          <div class="row">
            <div class="col-xl-6">
              <div class="form_block">
                <div class="text_block">
                  <a href="/" class="educate_link_btn color-primary h6 mb-48"><i
                    class="far fa-chevron-left"></i> Back To Home</a>
                  <div class="title">
                    <img src="assets/media/shapes/mic-speaker.png" alt="" class="speaker_icon" />
                    <h2 class="mb-48">Login to an account</h2>
                  </div>

                  <button type="submit" onClick={handleLogin} class="b-unstyle educate-btn w-100 mb-24"><span
                    class="educate-btn__curve"></span>Login with google Account</button>
                  <div class="text-center">
                    {/* <h6 class="mb-24">Sign in with your email address</h6> */}
                  </div>
                  <form class="form-validator">
                    <div class="row">


                    </div>

                    {/* <button type="submit" onClick={handleLogin} class="b-unstyle educate-btn w-100 mb-24"><span
                      class="educate-btn__curve"></span>Login Account</button> */}
                    {/* <button onClick={handleLogin}>Sign in with Google</button> */}
                  </form>

                </div>
                <div class="shapes">
                  <img src="assets/media/shapes/vector-9.png" alt="" />
                  <img src="assets/media/shapes/vector-8.png" alt="" />
                  <img src="assets/media/shapes/circle-lines-3.png" alt="" />
                  <img src="assets/media/shapes/location.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </section >



      {/* <button onClick={handleLogin}>Sign in with Google</button> */}
    </>
  );
};

export default AuthComponent;