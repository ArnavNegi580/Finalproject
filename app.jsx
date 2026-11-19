
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const PrivateRoute = ({ children }) => {
    return user && localStorage.getItem("token")
      ? children
      : <Navigate to="/login" replace />;
  };

  return (
    <>
      <Navbar user={user} logout={logout} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              user ? <Navigate to="/dashboard" /> :
              <Login setUser={setUser} />
            }
          />

          <Route
            path="/register"
            element={
              user ? <Navigate to="/dashboard" /> :
              <Register />
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard user={user} />
              </PrivateRoute>
            }
          />

          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditBlog />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
