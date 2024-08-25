import { Outlet } from "react-router-dom";
import MainNav from "./MainNav";

function AppLayout() {
  return (
    <div>
      <MainNav />

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
