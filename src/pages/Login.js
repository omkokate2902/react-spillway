import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

import { auth, provider } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';

function Login({ }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };


  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info: ", user);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  // return (
  //   <div>
  //     <button onClick={handleLogin}>Sign in with Google</button>
  //   </div>
  // );




  return (
    <div>

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


                  <div class="text-center">
                    <h6 class="mb-24">Sign in with your email address</h6>
                  </div>
                  <form class="form-validator">
                    <div class="row">


                    </div>

                    <button type="submit" class="b-unstyle educate-btn w-100 mb-24"><span
                      class="educate-btn__curve"></span>Login Account</button>
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

    </div >
  );
}

export default Login;
