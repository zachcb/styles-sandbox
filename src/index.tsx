import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Themed } from './styles';

ReactDOM.render(
  <React.StrictMode>
    <Themed>
      <App />
    </Themed>
  </React.StrictMode>,
  document.getElementById('root')
);
