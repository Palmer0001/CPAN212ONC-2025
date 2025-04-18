import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navigation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userName } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <header className="navigation">
      <h1 className="brand-title">Bookstore</h1>
      <nav style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/books">All Books</Link>
        <Link to="/books/add">Add Book</Link>
       

        {isAuthenticated ? (
          <>
            <span>Hello, {userName}!</span>
            <button onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navigation;