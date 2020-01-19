import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNav from './components/Navigation/MainNav';
import AuthContext from './context/auth-context';

import './App.css';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const login = (token, userId, tokenExpiration) => {
    console.error('login in App')
    setToken(token);
    setUserId(userId);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    alert('utilisateur déconnecté');
  }
  return (

    <Router>
      <AuthContext.Provider value={{token: token, userId: userId, login: login, logout: logout}}>
        <MainNav />
        <Switch>
          {/* REDIRECTIONS */}
          {/* {!token && <Redirect from="/bookings" to="/auth" exact/>} */}
          {token && <Redirect from="/" to="/events" exact/>}
          {token && <Redirect from="/auth" to="/events" exact/>}

          {/* ROUTES */}
          {!token && <Route path="/auth" component={AuthPage} />}
          {/* UNAUTHENTICATED REDIRECTION */}
          <Route path="/events" component={EventsPage} />
          {!token && <Redirect to="/auth"/>}
          {token && <Route path="/bookings" component={BookingsPage} />}
          <Route component={NotFoundPage} />

        </Switch>
      </AuthContext.Provider>
      
    </Router>

  );
}

export default App;
