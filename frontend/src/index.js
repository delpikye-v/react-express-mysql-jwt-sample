import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import Config from './middleware/config.middleware';

import reportWebVitals from './reportWebVitals';

Config.register()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
