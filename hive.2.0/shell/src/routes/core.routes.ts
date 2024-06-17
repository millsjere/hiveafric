import { lazy } from "react";
import { RouteProps } from "../components/shared/Interfaces";

// Public Routes
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));

// Private Routes
const VerifyAccount = lazy(() => import("../pages/auth/VerifyEmail"));
const Verify2FA = lazy(() => import("../pages/auth/Verify2FA"));
const Dashboard = lazy(() => import("../pages/account/Dashboard"));

// Routes
const LoginRoute = {
  path: "/",
  component: Login,
  isAuth: "no",
};

const SignupRoute = {
  path: "/signup",
  component: Signup,
  isAuth: "no",
};

const ForgotPasswordRoute = {
  path: "/forgot-password",
  component: ForgotPassword,
  isAuth: "no",
};

const ResetPasswordRoute = {
  path: "/reset-password",
  component: ResetPassword,
  isAuth: "no",
};

const VerifyAccountRoute = {
  path: "/verify-email",
  component: VerifyAccount,
  isMiddle: true,
};
const VerifyLoginRoute = {
  path: "/auth-2fa",
  component: Verify2FA,
  isMiddle: true,
};

const DashboardRoute = {
  path: "/dashboard",
  component: Dashboard,
  isAuth: "yes",
};

// export all routes as array
export const coreRoutes: RouteProps[] = [
  LoginRoute,
  SignupRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
  VerifyAccountRoute,
  VerifyLoginRoute,
  DashboardRoute,
];
