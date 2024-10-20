import React from 'react';
import ReactDOM from 'react-dom/client';
import './artems-index.css';
import './egors-index.css';
import App from './App';
import { NotificationProvider } from './contexts/NotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <NotificationProvider>
            <App />
        </NotificationProvider>
    </React.StrictMode>
);
