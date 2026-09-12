import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { fetchAuth, logout } from "../api/auth";

export const Layout = () => {
  const [auth, setAuth] = useState({
    authenticated: false,
    username: "",
    isAdmin: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const data  = await fetchAuth();
        setAuth(data);
      } catch (error) {
        console.error(error);
        setAuth({
          authenticated: false,
          username: "",
          isAdmin: false,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      logout();

      setAuth({
        authenticated: false,
        username: "",
        isAdmin: false,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>認証状態を確認しています。</p>;
  }

  if (!auth.authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Header auth={auth} onLogout={handleLogout} />

      <main>
        <div className="inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
