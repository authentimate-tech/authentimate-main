import { RootState } from "@/app/store";
import { Roles } from "@/features/auth/authTypes";
import LoginForm from "@/features/auth/components/LoginForm";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const AuthPage = ({ mode }: { mode: "SIGN_IN" | "SIGN_UP" }) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === Roles.USER) {
        navigate("/user");
      }
      if (user?.role === Roles.RECIPEINT) {
        navigate("/recipient");
      }
    }
  }, [isAuthenticated, user]);


  return (
    <div>
      {mode === "SIGN_IN" ? (
        <LoginForm />
      ) : mode === "SIGN_UP" ? (
        <RegisterForm />
      ) : null}
    </div>
  );
};

export default AuthPage;
