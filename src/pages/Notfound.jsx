// src/components/NotFound.js
import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router for routing

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>
        Sorry, the page you are looking for doesn't exist.
      </p>
      <Link to="/home" style={styles.link}>
        Go back
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f8f8f8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontSize: "48px",
    marginBottom: "20px",
    color: "#333",
  },
  message: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#666",
  },
  link: {
    fontSize: "18px",
    color: "#007BFF",
    textDecoration: "none",
  },
};

export default NotFound;
