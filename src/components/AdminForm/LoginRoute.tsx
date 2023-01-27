import { Outlet, Navigate } from "react-router";

const LoginRoute = () => {
  let auth = { "token": true }
  return (
    auth.token ? <Outlet /> : <Navigate to="/login" />
  )
}

export default LoginRoute