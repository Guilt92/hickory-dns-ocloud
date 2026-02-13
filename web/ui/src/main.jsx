import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { setAuthToken } from './api/client';
import './index.css';

// Initialize auth token from localStorage
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
