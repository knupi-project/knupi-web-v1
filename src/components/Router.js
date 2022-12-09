import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

const AppRouter = ({isLoggedIn, auth, setInit}) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/home">
              <Home auth={auth} setInit={setInit} />
            </Route>
            <Redirect from="*" to="/home" />
            {/* 잘못된 경로로 접근 시 홈으로 리다이렉트 */}
          </>
        ) : (
          <>
            <Route exact path="/auth">
              <Auth auth={auth} />
            </Route>
            <Redirect from="*" to="/auth" />
            {/* 잘못된 경로로 접근 시 홈으로 리다이렉트 */}
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
