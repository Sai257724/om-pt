import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("ompt_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("ompt_user", JSON.stringify(user));
    else localStorage.removeItem("ompt_user");
  }, [user]);

  const login = async ({ fullName, email, password, role }) => {
    const fakeUser = { id: Date.now(), fullName, email, role };
    setUser(fakeUser);
    return fakeUser;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
