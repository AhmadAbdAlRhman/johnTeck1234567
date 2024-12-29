import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AuthProvider from "./Authentication/AuthProvider";
import "./all.min.css";
import {
  BrowserRouter as Router
} from 'react-router-dom';
// import './i18n';
const root = ReactDOM.createRoot(document.getElementById('root'));
// 
root.render( 
  <AuthProvider >
    <Router>
      <App/>
    </Router> 
  </AuthProvider>
);