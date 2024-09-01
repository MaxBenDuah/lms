import { Outlet } from "react-router-dom";
import MainNav from "./MainNav";
import InnerHeading from "./InnerHeading";

function AppLayout() {
  return (
    <div>
      <header>
        <MainNav />
      </header>

      <div>
        <InnerHeading />
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
