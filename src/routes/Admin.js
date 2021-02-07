import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../features/app/pages/Home/';
import AuthPage from '../features/auth/pages/Auth/';
import AccountManagerPage from '../features/user/pages/AccountManager/';
import ProfilePage from '../features/user/pages/Profile/';
import Page404 from '../features/app/pages/Exception/404/';
import BasicLayout from '../layouts/BasicLayout';
import SecurityLayout from '../layouts/SecurityLayout';
import BlankLayout from '../layouts/BlankLayout';
function AdminRoute() {
  return (
    <Switch>
      <Route path="/" exact>
        <BasicLayout>
          <HomePage />
        </BasicLayout>
      </Route>
      <Route path="/auth">
        <BasicLayout>
          <AuthPage />
        </BasicLayout>
      </Route>
      <Route path="/users">
        <SecurityLayout needPermission="moderator">
          <AccountManagerPage />
        </SecurityLayout>
      </Route>
      <Route path="/me">
        <SecurityLayout>
          <ProfilePage />
        </SecurityLayout>
      </Route>
      <Route path="*">
        <BlankLayout>
          <Page404 />
        </BlankLayout>
      </Route>
    </Switch>
  );
}

export default AdminRoute;
