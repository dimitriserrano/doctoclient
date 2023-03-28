import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import{getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

console.log(import.meta.env.VITE_API_KEY)
console.log(import.meta.env.VITE_AUTH_DOMAIN)
console.log(import.meta.env.VITE_PROJECT_ID)
console.log(import.meta.env.VITE_STORAGE_BUCKET)
console.log(import.meta.env.VITE_MESSAGING_SENDER_ID)
console.log(import.meta.env.VITE_APP_ID)
console.log(import.meta.env.VITE_MEASUREMENT_ID)


const firebaseConfig = {
  apiKey: "AIzaSyAWcMBxauiMe5HYOogZRTTIMPZOHW0HlAQ",
  authDomain: "doctoliblike-e9e89.firebaseapp.com",
  projectId: "doctoliblike-e9e89",
  storageBucket: "doctoliblike-e9e89.appspot.com",
  messagingSenderId: "544340079763",
  appId: "1:544340079763:web:750fdc3b4a3ab144d58966",
  measurementId: "G-5BGN7J69WY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
      //if app can be installed, assign the event to deferred prompt variable
      deferredPrompt = e;
  });

  window.addEventListener('load', () => {
    //select the button with ID pwaAppInstallBtn
    const pwaAppInstallBtn = document.querySelector('#pwaAppInstallBtn');
    pwaAppInstallBtn.addEventListener('click', async () => {
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
        } else {
            console.log("deferred prompt is null [Website cannot be installed]")
        }
    });
})

  const calendar = () => {
    window.open( "data:text/calendar;charset=utf8," +escape("BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Our Company//NONSGML v1.0//EN\nBEGIN:VEVENT\nUID:me@google.com\nDTSTAMP:20120315T170000Z\nATTENDEE;CN=My Self ;RSVP=TRUE:MAILTO:me@gmail.com\nORGANIZER;CN=Me:MAILTO::me@gmail.com\nSUMMARY:Our Meeting Office\nEND:VEVENT\nEND:VCALENDAR"));
  }

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then(
      (UserResponse) => {
        const user = UserResponse.user;
        console.log(UserResponse)
      }
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.errorMessage
    })
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user : ', user)
      //user is signed, see doc for available properties
      const uid = user.uid;
    } else{
      //user is signed out
    }
  })

  const logout = () => {
    signOut(auth).then(() => {
      //sign out successful.
    }).catch((error)=>{
      //an error happend
    })
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
  ]);


  return (
    <div>
      <h1>Connexion</h1>
      <a HREF="mailto:envoiemail@mail.com">envoyer un mail</a>
      <div>
        <label htmlFor="email"></label>
        <input 
          type="text" 
          id="email" 
          name="email"
          onChange={handleChangeEmail}
        />
        <p></p>
        <label htmlFor="mdp"></label>
        <input 
          type="password" 
          id="mdp" 
          name="mdp"
          onChange={handleChangePassword}
        />
      </div>
      <p></p>
      <button onClick={() => login()}>Se connecter</button>
      <button onClick={() => logout()}>Se déconnecter</button>
      <p></p>
      <button onClick={() => calendar()}>Event calendar</button>
      <button onClick={() => install()}>installer</button>
    </div>
  )
}

export default App
