import React, { useState, useEffect } from "react";
function ManageAuthentification() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("_auth_state");
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
  }, []);

  const adminOrUser = () => {
    const loggedInUser = localStorage.getItem("_auth_state");
    if (loggedInUser) {
      if (JSON.parse(loggedInUser).role === "user") {
        return "user";
      } else {
        return "admin";
      }
    }
  };

  return { adminOrUser, setUser };
}

export default ManageAuthentification;
