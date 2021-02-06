import React from 'react'
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute/"
import HomePage from "../features/app/pages/Home/";
import AuthPage from "../features/auth/pages/Auth/";
import AccountManagerPage from '../features/user/pages/AccountManager/';
import ProfilePage from '../features/user/pages/Profile/';
function AdminRoute() {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/auth"  >
        <AuthPage />
      </Route>
      <PrivateRoute path="/users" >
        <AccountManagerPage />
      </PrivateRoute>
      <PrivateRoute path="/me" >
        <ProfilePage />
      </PrivateRoute>
    </Switch>
  )
}

export default AdminRoute;
