import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/fonts/AzoSans-Bold.ttf';
import './assets/fonts/AzoSans-Medium.ttf';
import './assets/fonts/AzoSans-Thin.ttf';
import './assets/fonts/AzoSans-Regular.ttf';
import NavBar from './components/NavBar';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
