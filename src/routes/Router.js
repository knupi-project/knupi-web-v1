import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Layout from 'layouts/main/Layout';
import Home from '../views/main/Home';
import SignIn from '../views/auth/SignIn';
import SignUp from '../views/auth/SignUp';
import Reserve from 'views/main/reservation/Reservation';
import ReservePage from 'views/reserve_page/ReservePage';
import ReserveCheck from 'views/reserve_page/ReserveCheck';
import ReserveComplete from 'views/reserve_page/ReserveComplete';
import Profile from 'layouts/profile/Profile';
import UserInfo from 'views/profile/UserInfo';
import UserReserve from 'views/profile/UserReserveInfo';
import About from 'views/main/About';
import Contact from 'views/main/Contact';
import Error from '../components/Error';
import Auth from 'layouts/auth/Auth';

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<Error />}>
        <Route path="/" element={<Navigate to="/app/home" />}></Route>
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
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
