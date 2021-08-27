import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';

render(
  <React.StrictMode>
    <Router>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
