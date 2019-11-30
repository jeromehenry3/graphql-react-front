import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNav from './components/Navigation/MainNav';

import './App.css';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (

    <Router>
      <MainNav />
      <Switch>
        <Redirect from="/" to="/auth" exact/>
        <Route path="/auth" component={AuthPage} />
        <Route path="/events" component={EventsPage} />
        <Route path="/bookings" component={BookingsPage} />
        <Route component={NotFoundPage} />
      </Switch>
      
    </Router>

  );
}

export default App;
