import React from 'react';
import Layout from 'routes/Layout';
import Home from '../routes/Home';
import SignIn from '../routes/SignIn';
import SignUp from '../routes/SignUp';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Reserve from 'routes/Reserve';
import Profile from 'routes/Profile';
import UserInfo from 'routes/UserInfo';
import UserReserve from 'routes/UserReserve';

const AppRouter = ({isLoggedIn, setInit, setIsLoggedIn}) => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        }
      >
        <Route
          path="/home"
          element={<Home setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route path="/reserve" element={<Reserve></Reserve>}></Route>
        <Route
          path="/signin"
          element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/profile"
          element={<Profile setIsLoggedIn={setIsLoggedIn}></Profile>}
        >
          <Route
            path="/profile/info"
            element={<UserInfo setIsLoggedIn={setIsLoggedIn}></UserInfo>}
          />
          <Route
            path="/profile/reserve"
            element={<UserReserve setIsLoggedIn={setIsLoggedIn}></UserReserve>}
          />
        </Route>

        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="/*" element={<Navigate to="/home" />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
