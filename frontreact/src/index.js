import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Auth0Provider } from "@auth0/auth0-react";


import LoginButton from './components/Auth/LogInButton';
import LogOutButton from './components/Auth/LogOutButton';
import Profile from './components/Auth/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-q8frvdoypr2a0xf3.us.auth0.com"
    clientId="VNVz3a9lyUuxe3XDipjMwC54OpjMwO8k"
    redirectUri={window.location.origin}
    audience="http://proyecto-base-grupo-24-web-1:8000"
    scope="read:events"
  >
  <React.StrictMode>
    <LoginButton/>
    <LogOutButton/>
    <Profile/>
    <App />
  </React.StrictMode>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
