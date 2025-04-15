import React, { useState } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import CreatePost from "./Components/CreatePost"; //

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUsername(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>{isLoggedIn ? `Dashboard` : `Welcome Guest!`}</h1>

      {isLoggedIn ? (
        <>
          <Logout username={username} onLogout={handleLogout} />
          <CreatePost />
        </>
      ) : (
        <>
          <Register />
          <hr style={{ margin: "40px" }} />
          <Login onLogin={handleLogin} />
        </>
      )}
    </div>
  );
}

export default App;
