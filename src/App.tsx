import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Hello from './components/Hello'
import Photos from './components/Photos'
import './App.global.css';

export default function App() { //using react router dom
  return (
    <Router>
      <Switch>
        <Route path="/photos" component={Photos} />
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
