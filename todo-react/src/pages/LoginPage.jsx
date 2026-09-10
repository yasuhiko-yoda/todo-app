import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";


export const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
    console.log(showPassword);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: userName,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("ユーザー名またはパスワードが正しくありません。");
      }
      navigate("/tasks");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };



  return (
    <div>
      <h1>Todoアプリ</h1>
      <h2>ログインページ</h2>

      <form onSubmit={handleLogin}>
        <p>
          <label htmlFor="username">ユーザー名：</label>
          <input
            id="username"
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            required
          />
        </p>

        <p>
          <label htmlFor="password">パスワード：</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <Button
            btnColor="white"
            btnBgColor="red"
            type="button"
            size="min"
            btnName={showPassword ? "パスワードを隠す" : "パスワードを見る"}
            onClick={handleShowPassword}
          />
        </p>

        {errorMessage && <p>{errorMessage}</p>}

        <Button
          btnColor="white"
          btnBgColor="red"
          type="submit"
          size="min"
          btnName="ログイン"
        />
      </form>
    </div>
  );
};
