import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUser = localStorage.getItem("user");

    if (storedUserId) setUserId(Number(storedUserId));
    if (storedUser) setUser(JSON.parse(storedUser));

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUserId(Number(userData.userid));
    setUser(userData);
    localStorage.setItem("userId", userData.userid);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUserId(null);
    setUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ userId, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);