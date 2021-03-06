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
import Dashboard from '../components/Dashboard';
import Item from '../components/Item';
import Vendors from '../components/Vendors';
import Supplier from '../components/Supplier';
import InventoryIn from '../components/inventoryIn';
import InventoryOut from '../components/inventoryOut';
import Setting from '../components/Settings';
import Challan from '../components/Challan';

function Routes() {
  // let location = useLocation();
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/">
          <Login />
        </PublicRoute>
        <PrivateRoute path="/Dashboard">
          <HomePage MainComponent={Dashboard} />
        </PrivateRoute>
        <PrivateRoute path="/Items">
          <HomePage MainComponent={Item} />
        </PrivateRoute>
        <PrivateRoute path="/Vendor">
          <HomePage MainComponent={Vendors} />
        </PrivateRoute>
        <PrivateRoute path="/Supplier">
          <HomePage MainComponent={Supplier} />
        </PrivateRoute>
        <PrivateRoute path="/InventoryIn">
          <HomePage MainComponent={InventoryIn} />
        </PrivateRoute>
        <PrivateRoute path="/Challan">
          <HomePage MainComponent={Challan} />
        </PrivateRoute>
        <PrivateRoute path="/Settings">
          <HomePage MainComponent={Setting} />
        </PrivateRoute>
        <PrivateRoute path="/InventoryOut">
          <HomePage MainComponent={InventoryOut} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
export default Routes;

// Define public Route

function PublicRoute({ children, ...rest }) {
  const login = localStorage.getItem('login') === 'true';
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
  const login = localStorage.getItem('login') === 'true';
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
