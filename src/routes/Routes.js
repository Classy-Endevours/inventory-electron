/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from '../components/Login';
import HomePage from '../components/HomePage';

function Routes() {
  // let location = useLocation();
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/">
          <Login />
        </PublicRoute>
        <PrivateRoute path="/Dashboard">
          <HomePage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
export default Routes;

// Define public Route

function PublicRoute({ children, ...rest }) {
  const login = localStorage.getItem('login') !== 'false';
  return (
    <Route
      {...rest}
      render={({ location }) =>
        login ? (
          <Redirect
            to={{
              pathname: '/Dashboard',
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}

// Define Private Route
function PrivateRoute({ children, ...rest }) {
  const login = localStorage.getItem('login') !== 'false';
  return (
    <Route
      {...rest}
      render={({ location }) =>
        login ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
