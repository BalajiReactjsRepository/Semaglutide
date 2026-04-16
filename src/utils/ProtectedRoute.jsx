import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const tokenKey = process.env.REACT_APP_SECRET_TOKEN || "token";
  const jwtToken = Cookies.get(tokenKey);

  if (!jwtToken) {
    return <Navigate to='/login' replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
