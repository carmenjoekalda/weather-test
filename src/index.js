import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherApplication from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherApplication />
  </React.StrictMode>
);

reportWebVitals();
