import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      setProfile(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
