import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Layout from 'routes/Layout';
import Home from '../routes/Home';
import SignIn from '../routes/SignIn';
import SignUp from '../routes/SignUp';
import Reserve from 'routes/Reserve';
import Profile from 'routes/Profile';
import UserInfo from 'routes/UserInfo';
import UserReserve from 'routes/UserReserve';
import About from 'routes/About';
import Contact from 'routes/Contact';

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/reserve" element={<Reserve />}></Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="/profile/info" element={<UserInfo />} />
            <Route path="/profile/reserve" element={<UserReserve />} />
          </Route>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="/*" element={<Navigate to="/home" />}></Route>
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
