import React from 'react';

import Auth from '../routes/SingIn';
import Home from '../routes/Home';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

const AppRouter = ({isLoggedIn, auth, setInit}) => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      // isLoggedIn ? (
      //   <>
      //     <Route
      //       path="/home"
      //       element={<Home auth={auth} setInit={setInit} />}
      //     />
      //     <Route path="/*" element={<Navigate to="/home" />}></Route>
      //     {/* 잘못된 경로로 접근 시 홈으로 리다이렉트 */}
      //   </>
      // ) : (
      //   <>
      //     <Route path="/auth" element={<Auth auth={auth} />} />
      //     <Route path="/*" element={<Navigate to="/home" />}></Route>
      //     {/* 잘못된 경로로 접근 시 홈으로 리다이렉트 */}
      //   </>
      // )
      <>
        <Route
          path="/home"
          element={<Home auth={auth} setInit={setInit} />}
        ></Route>
        <Route path="/auth" element={<Auth auth={auth} />} />
        <Route path="/*" element={<Navigate to="/home" />}></Route>
      </>
    )
  );
  return (
    // <BrowserRouter>
    //   <Routes>
    //     {isLoggedIn ? (
    //       <>
    //         <Route
    //           path="/home"
    //           element={<Home auth={auth} setInit={setInit} />}
    //         />
    //         <Route path="*" element={<Navigate to="/home" />}></Route>
    //         {/* 잘못된 경로로 접근 시 홈으로 리다이렉트 */}
    //       </>
    //     ) : (
    //       <>
    //         <Route path="/home" element={<Auth auth={auth} />} />
    //         <Route path="*" element={<Navigate to="/home" />}></Route>
    //         {/* 잘못된 경로로 접근 시 홈으로 리다이렉트 */}
    //       </>
    //     )}
    //   </Routes>
    // </BrowserRouter>
    <RouterProvider router={router} />
  );
};

export default AppRouter;
