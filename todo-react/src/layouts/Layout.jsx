import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { fetchAuth } from "../api/auth";

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
        // const response = await fetch("http://localhost:8080/api/auth/status", {
        //   credentials: "include",
        // });

        // if (!response.ok) {
        //   throw new Error("認証状態を取得できませんでした。");
        // }

        // const data = await response.json();
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
      const response = await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("ログアウトに失敗しました。");
      }

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
        <Outlet />
      </main>
    </div>
  );
};
