import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import "./index.css";
import "./app.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';




ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
        <App />
    </Router>
);