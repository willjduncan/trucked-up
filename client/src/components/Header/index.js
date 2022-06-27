import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  function userdata () {
    return Auth.getProfile();
  }

  return (
  <header className="header">
      <Link to="/">
        <h1>Truck It Up!</h1>
      </Link>
        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              {(userdata().data.position === "dispatcher") ? (
                <>
                  <Link to="/drivers">Drivers</Link>
                </>
              ) : (
                <></>
              )}
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
    </header>
  );
};

export default Header;
