import React, {useEffect} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { access, isAuthenticated } from './auth' 

const ProtectedRoute = () => {
  const accessToken = useSelector(access);
  const isAuth = useSelector(isAuthenticated);
  const location = useLocation();

  if (!accessToken || !isAuth) {
    // Redirect to login if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Determine the default route based on user group
  const defaultRoute = '/' ;

  // If the user is trying to access the root path, redirect to their default dashboard
  if (location.pathname === '/') {
    return <Navigate to={defaultRoute} replace />;
  }

  // Allow access to child routes
  return <Outlet />;
};

export default ProtectedRoute;



// (
//     <Outlet />
// ) : (
//     <Navigate to="/" state={{from: location}} replace />
// )




// const { data, isSuccess } = useGetUserGroupQuery(undefined, {
//     skip: !accessToken,
//   });

//   useEffect(() => {
//     if (isSuccess && data) {
//       dispatch(setGroup({ groups: data.groups }));
//     }
//   }, [isSuccess, data, dispatch]);

//   if (!accessToken) {
//     return <Navigate to="/" />;
//   }

//   if (!isSuccess) {
//     return <div>Loading...</div>; // Optional: Show loading indicator while fetching user groups
//   }

//   const defaultRoute = groupss.includes('admin') ? '/iam' : '/';
//   return <Navigate to={defaultRoute} />;