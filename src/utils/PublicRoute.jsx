import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const tokenKey = process.env.REACT_APP_SECRET_TOKEN || "token";
  const token = Cookies.get(tokenKey);

  if (token) {
    return <Navigate to='/doctor-dashboard' replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
