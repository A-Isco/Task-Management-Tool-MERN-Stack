import { NavLink } from "react-router-dom";

let Navbar = ({ logout }) => {
  const logoutButton = () => {
    localStorage.clear();
    logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link  h5" to={"/task/show"}>
                  Tasks Lists
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link  h5" to={"/task/create"}>
                  Create Task
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link h5" to={"/editProfile"}>
                  Edit Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link h5"
                  onClick={logoutButton}
                  to={"/login"}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
