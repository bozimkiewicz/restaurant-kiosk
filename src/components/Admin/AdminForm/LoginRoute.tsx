import { Outlet, Navigate } from "react-router";
import { useKeycloak } from "@react-keycloak/web";

const LoginRoute = () => {
  const { keycloak } = useKeycloak();
  
  const isAuth = keycloak.authenticated && keycloak.hasRealmRole("admin");

  if (isAuth) {
    return <Outlet />;
  }
  
  return <Navigate to="/home" />;
}

export default LoginRoute