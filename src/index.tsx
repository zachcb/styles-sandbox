import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DefaultLayout from "./components/layouts/DefaultLayout"

ReactDOM.render(
  <React.StrictMode>
    <DefaultLayout>
      <App />
    </DefaultLayout>
  </React.StrictMode>,
  document.getElementById('root')
);
