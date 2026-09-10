import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";

  

export const Header = ({ auth, onLogout }) => {
  return (
    <header>
      <div className="header-inner">
        <h1>Todoアプリ</h1>
		<nav>
            <ul>
              <li>
                <Link to="/tasks">タスク一覧</Link>
              </li>
            </ul>

            {auth.authenticated && (
              <form onSubmit={onLogout}>
                <p>
                  <span>{auth.username}</span> ログイン中
                </p>
                <Button
                  btnColor="white"
                  btnBgColor="red"
                  type="submit"
                  size="medium"
                  btnName="ログアウト"
                />
              </form>
            )}
          </nav>
      </div>
    </header>
  );
};

