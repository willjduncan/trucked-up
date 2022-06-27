import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="header">
      <Link to="/">
        <h1>Truck It Up!</h1>
      </Link>

      <nav className="text-center">
        {Auth.loggedIn() ? (
          <ul>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </ul>
        ) : (
          <ul>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
