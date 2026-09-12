import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../layouts/Header";
import { Button } from "../components/common/Button";
import { fetchAuth, login } from "../api/auth";
import "./LoginPage.css";

export const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [auth, setAuth] = useState({
    authenticated: false,
    username: "",
    isAdmin: false,
  });
  const navigate = useNavigate();

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const data = await fetchAuth();

        if (data.authenticated) {
          navigate("/tasks");
          return;
        }
        setAuth(data);
      } catch (error) {
        console.error(error);
        setAuth({
          authenticated: false,
          username: "",
          isAdmin: false,
        });
      }
    };

    fetchAuthStatus();
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setErrorMessage("");
    setSubmitting(true);
    try {
      await login(userName, password);
      navigate("/tasks");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Header auth={auth} />
      <main>
        <div className="inner">
          <section className="section">
            <h2>ログインページ</h2>
            <p className="app-description">タスクを管理するアプリです。</p>
            <p>ユーザー名とパスワードを入力してください。</p>
            <form onSubmit={handleLogin} className="login-form">
              <div className="login-content">
                <p>
                  <label htmlFor="username">ユーザー名</label>
                </p>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  required
                />
              </div>
              <div className="login-content">
                <p>
                  <label htmlFor="password">パスワード</label>
                </p>
                <div className="password-area">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    size="min"
                    btnName={showPassword ? "隠す" : "見る"}
                    onClick={handleShowPassword}
                  />
                </div>
              </div>

              {errorMessage && <p>{errorMessage}</p>}
              <div className="button-wrapper">
                <Button type="submit" size="max" btnName={submitting? "ログイン中" : "ログイン"} disabled={submitting}/>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};
