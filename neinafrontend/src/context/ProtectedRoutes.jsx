import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoutes= ({ redirectPath = "/login" }) => {
  const { user } = useAuth(); 

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />; 
};

export default ProtectedRoutes;
