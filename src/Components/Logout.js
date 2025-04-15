import React from "react";

const Logout = ({ username, onLogout }) => {
  return (
    <div style={styles.container}>
      <h2>Welcome, {username} 👋</h2>
      <p>You are logged in.</p>
      <button onClick={onLogout} style={styles.button}>
        Log Out
      </button>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "30px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default Logout;
