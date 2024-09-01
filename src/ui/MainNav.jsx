import { Link } from "react-router-dom";

function MainNav() {
  return (
    <nav className="flex justify-content-around">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* <li>
          <Link to="/employees">Employees</Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default MainNav;
