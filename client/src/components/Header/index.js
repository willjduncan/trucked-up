import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  function userdata() {
    return Auth.getProfile();
  }

  return (
    <header className="header">
      <div className="flex-row">
        <Link to="/">
          <h1>Truck It Up!</h1>
        </Link>
        <Link to="/add-client">New Client</Link>
      </div>

      <nav className="text-center">
        {Auth.loggedIn() ? (
          <>
            {userdata().data.position === "dispatcher" ? (
              <>
                <Link className="navlinks" to="/drivers">
                  Drivers
                </Link>
                <Link className="navlinks" to="/add">
                  Add Job
                </Link>
              </>
            ) : (
              <>
                <Link className="navlinks" to="/completed_drives">
                  Completed Drives
                </Link>
              </>
            )}
            <Link className="navlinks" to="/dashboard">
              Dashboard
            </Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link className="navlinks" to="/login">
              Login
            </Link>
            <Link className="navlinks" to="/signup">
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
