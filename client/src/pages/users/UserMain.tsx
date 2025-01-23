import { Navigate, Route, Routes } from "react-router-dom";
import DashboardMain from "./dashboard/DashboardMain";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Roles } from "@/features/auth/authTypes";

const UserMain = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if(!isAuthenticated || user?.role!=Roles.USER){
    return <Navigate to="/"/>
  }
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardMain />} />
      <Route path="/*" element={<Navigate to="/user/dashbaord" />} />
    </Routes>
  );
};

export default UserMain;
