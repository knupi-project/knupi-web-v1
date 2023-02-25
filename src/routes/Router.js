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
        <Route path="/" element={<Navigate to="/knupi-web-v1" />} />
        <Route
          path="/knupi-web-v1"
          element={<Navigate to="/knupi-web-v1/app/home" />}
        />
        <Route path="/knupi-web-v1/app" element={<MainLayout />}>
          <Route path="/knupi-web-v1/app/home" element={<Home />} />
          <Route
            path="/knupi-web-v1/app/reservation"
            element={<Reservation />}
          />
          <Route path="/knupi-web-v1/app/about" element={<About />} />
          <Route path="/knupi-web-v1/app/contact" element={<Contact />} />
          <Route path="/knupi-web-v1/app/reserve" element={<ReserveLayout />}>
            <Route
              path="/knupi-web-v1/app/reserve/page:type"
              element={<ReservePage />}
            />
            <Route
              path="/knupi-web-v1/app/reserve/check:type"
              element={<ReserveCheck />}
            />
            <Route
              path="/knupi-web-v1/app/reserve/complete:type"
              element={<ReserveComplete />}
            />
          </Route>
          <Route
            path="/knupi-web-v1/app/profile/:id"
            element={<ProfileLayout />}
          >
            <Route
              path="/knupi-web-v1/app/profile/:id/info"
              element={<UserInfo />}
            />
            <Route
              path="/knupi-web-v1/app/profile/:id/reserve"
              element={<UserReserveInfo />}
            />
          </Route>
        </Route>
        <Route path="/knupi-web-v1/auth" element={<AuthLayout />}>
          <Route path="/knupi-web-v1/auth/signin" element={<SignIn />} />
          <Route path="/knupi-web-v1/auth/signup" element={<SignUp />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
