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
import ReservePage from 'routes/ReservePage';
import Profile from 'routes/Profile';
import UserInfo from 'routes/UserInfo';
import UserReserve from 'routes/UserReserve';
import About from 'routes/About';
import Contact from 'routes/Contact';
import Error from './Error';

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/reserve" element={<Reserve />}></Route>
        <Route path="/reserve/page/:id" element={<ReservePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile/:id" element={<Profile />}>
          <Route path="/profile/:id/info" element={<UserInfo />} />
          <Route path="/profile/:id/reserve" element={<UserReserve />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
