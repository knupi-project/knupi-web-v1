import React from 'react';
import SignIn from '../routes/SignIn';
import SignUp from '../routes/SignUp';
import Home from '../routes/Home';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

const AppRouter = ({isLoggedIn, setInit, setIsLoggedIn}) => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/home"
          element={<Home setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route
          path="/signin"
          element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/*" element={<Navigate to="/home" />}></Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
