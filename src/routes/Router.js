import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Error from 'routes/Error';
import MainLayout from 'layouts/main/MainLayout';
import Home from 'views/main/Home';
import About from 'views/main/About';
import Contact from 'views/main/Contact';
import Reservation from 'views/main/reservation/Reservation';
import ReserveLayout from 'layouts/reserve/ReserveLayout';
import ReservePage from 'views/reserve/ReservePage';
import ReserveCheck from 'views/reserve/ReserveCheck';
import ReserveComplete from 'views/reserve/ReserveComplete';
import ProfileLayout from 'layouts/profile/ProfileLayout';
import UserInfo from 'views/profile/UserInfo';
import UserReserveInfo from 'views/profile/UserReserveInfo';
import AuthLayout from 'layouts/auth/AuthLayout';
import SignIn from '../views/auth/SignIn';
import SignUp from '../views/auth/SignUp';

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<Error />}>
        <Route path="/" element={<Navigate to="/app/home" />}></Route>
        <Route path="/app" element={<MainLayout />}>
          <Route path="/app/home" element={<Home />} />
          <Route path="/app/reservation" element={<Reservation />} />
          <Route path="/app/about" element={<About />} />
          <Route path="/app/contact" element={<Contact />} />
          <Route path="/app/reserve" element={<ReserveLayout />}>
            <Route path="/app/reserve/page:type" element={<ReservePage />} />
            <Route path="/app/reserve/check:type" element={<ReserveCheck />} />
            <Route
              path="/app/reserve/complete:type"
              element={<ReserveComplete />}
            />
          </Route>
          <Route path="/app/profile/:id" element={<ProfileLayout />}>
            <Route path="/app/profile/:id/info" element={<UserInfo />} />
            <Route
              path="/app/profile/:id/reserve"
              element={<UserReserveInfo />}
            />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
