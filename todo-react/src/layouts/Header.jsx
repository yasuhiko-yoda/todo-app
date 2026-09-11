import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";
import "./Header.css";

export const Header = ({ auth, onLogout }) => {
  return (
    <header>
      <div className="header-inner">
        <h1>Todoアプリ</h1>

        {auth.authenticated && (
          <div className="header-actions">
            <nav aria-label="メインメニュー">
              <Link to="/tasks">タスク一覧</Link>
            </nav>

            <form onSubmit={onLogout}>
              <p className="login-user">
                <span className="user-name">{auth.username}</span>
                <span className="login-status"> ログイン中</span>
              </p>

              <Button
                type="submit"
                size="medium"
                variant="secondary"
                btnName="ログアウト"
              />
            </form>
          </div>
        )}
      </div>
    </header>
  );
};
