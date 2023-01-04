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
import ReserveCheck from 'routes/ReserveCheck';
import ReserveComplete from 'routes/ReserveComplete';
import Profile from 'routes/Profile';
import UserInfo from 'routes/UserInfo';
import UserReserve from 'routes/UserReserve';
import About from 'routes/About';
import Contact from 'routes/Contact';
import Error from './Error';

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<Error />}>
        <Route path="/app" element={<Layout />}>
          <Route path="/app/home" element={<Home />}></Route>
          <Route path="/app/reserve" element={<Reserve />}></Route>
          <Route path="/app/reserve/page/:id" element={<ReservePage />} />
          <Route path="/app/reserve/check/:id" element={<ReserveCheck />} />
          <Route
            path="/app/reserve/complete/:id"
            element={<ReserveComplete />}
          />
          <Route path="/app/about" element={<About />} />
          <Route path="/app/contact" element={<Contact />} />
          <Route path="/app/profile/:id" element={<Profile />}>
            <Route path="/app/profile/:id/info" element={<UserInfo />} />
            <Route path="/app/profile/:id/reserve" element={<UserReserve />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/app/home" />}></Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
