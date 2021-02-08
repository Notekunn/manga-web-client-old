import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../features/app/pages/Home/';
import AuthPage from '../features/auth/pages/Auth/';
import AccountManagerPage from '../features/user/pages/AccountManager/';
import ArtistManagerPage from '../features/artist/pages/ArtistMangager/';
import ProfilePage from '../features/user/pages/Profile/';
import Page404 from '../features/app/pages/Exception/404/';
import BasicLayout from '../layouts/BasicLayout';
import SecurityLayout from '../layouts/SecurityLayout';
import BlankLayout from '../layouts/BlankLayout';
import ErrorBoundary from '../features/app/components/ErrorBoundary';
function AdminRoute() {
  return (
    <ErrorBoundary>
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
        <Route path="/artists">
          <SecurityLayout needPermission="moderator">
            <ArtistManagerPage />
          </SecurityLayout>
        </Route>
        <Route path="*">
          <BlankLayout>
            <Page404 />
          </BlankLayout>
        </Route>
      </Switch>
    </ErrorBoundary>
  );
}

export default AdminRoute;
