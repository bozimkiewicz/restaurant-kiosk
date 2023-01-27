import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

const LoginRoute = () => {

  const token =
  useSelector<{ auth: {token: string}}, string>(
    (state) => state.auth.token
  ) || '';

  return (
    token ? <Outlet /> : <Navigate to="/login" />
  )
}

export default LoginRoute