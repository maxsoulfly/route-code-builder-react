import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/mvp">MVP Generator (1.0)</NavLink>
      <NavLink to="/generator">Generator 2.0</NavLink>
    </nav>
  );
}

export default Nav;
