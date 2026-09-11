import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAuth } from "../api/auth";
import "./NotFound.css"

export const NotFound = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const data = await fetchAuth();
        setAuthenticated(data.authenticated);
      } catch (error) {
        console.error(error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  return (
    <main>
      <div className="inner">
        <h2>404</h2>
        <p>ページが存在しません。</p>

        <div className="not-found button-wrapper">
          {!loading && (
            <Link
              to={authenticated ? "/tasks" : "/login"}
              className="link-button edit-link button--primary button--large"
            >
              {authenticated ? "タスク一覧に戻る" : "ログイン画面に戻る"}
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};
