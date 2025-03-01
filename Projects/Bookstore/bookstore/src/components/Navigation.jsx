import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navigation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const isAuthenticated = !!token;

  let userName = "Guest";
  if (isAuthenticated) {
    try {
      const decodedToken = jwtDecode(token);
      userName = decodedToken?.first_name || "User";
    } catch (error) {
      console.error("Error decoding token", error);
    }
  }

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
            <Link to="/logout">Logout</Link> {}
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
