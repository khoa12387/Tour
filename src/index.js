import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Initialize the root of the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application with Google OAuth Provider
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="517086870003-s3iejub9l61ojol1536pvva7kuavbkid.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// Optionally measure performance in your app
// Pass a function to log results or send to an analytics endpoint
reportWebVitals();
