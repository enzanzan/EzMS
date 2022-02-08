import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Admin from './admin';
import Router from './router';


ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

