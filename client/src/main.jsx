import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

// ลบ React.StrictMode หรือแสดงความคิดเห็นในบรรทัดนี้
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);