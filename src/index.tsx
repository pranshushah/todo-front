import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import './index.scss';

render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
