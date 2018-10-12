import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './header';
import AppBody from './body';
import Button from '@material-ui/core/Button';

const app = (
  <React.Fragment>
    <AppHeader />
    <AppBody />
  </React.Fragment>
);

ReactDOM.render(app, document.getElementById('app'));
