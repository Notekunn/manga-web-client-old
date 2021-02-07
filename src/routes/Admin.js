import React from 'react'
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute/';
import HomePage from '../features/app/pages/Home/';
import AuthPage from '../features/auth/pages/Auth/';
import AccountManagerPage from '../features/user/pages/AccountManager/';
import ProfilePage from '../features/user/pages/Profile/';
import BasicLayout from '../layouts/BasicLayout';
import SecurityLayout from '../layouts/SecurityLayout';
function AdminRoute() {
  return (
    <Switch>
      <Route path="/" exact>
        <BasicLayout>
          <HomePage />
        </BasicLayout>
      </Route>
      <Route path="/auth"  >
        <BasicLayout>
          <AuthPage />
        </BasicLayout>
      </Route>
      <Route path="/users" >
        <SecurityLayout >
          <AccountManagerPage />
        </SecurityLayout>
      </Route>
      <Route path="/me" >
        <SecurityLayout>
          <ProfilePage />
        </SecurityLayout>
      </Route>
    </Switch>
  )
}

export default AdminRoute;
