import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../contexts/UserContext";
import { LOGIN } from "../../utils/Routes";


const Protected = () => {
  const location = useLocation();
  const { user } = useContext(userContext);

  return user ? <Outlet /> : <Navigate to={LOGIN} state={{ from: location }} replace />;
};

export default Protected;