import { getCsrfToken, fetchCsrfToken } from "./csrf.js";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const handleResponse = async (response, errorMessage) => {
  if (!response.ok) {
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const login = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRF-TOKEN": getCsrfToken(),
    },
    credentials: "include",
    body: formData,
  });

  if (response.status === 401) {
    throw new Error("ユーザー名またはパスワードが正しくありません。");
  }

  const result = await handleResponse(
      response,
      "ログイン処理に失敗しました。"
  );

  // ログイン成功時に以前のトークンが破棄されるため再取得
  await fetchCsrfToken();

  return result;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRF-TOKEN": getCsrfToken(),
    }
  });

  return handleResponse(response, "ログアウトに失敗しました。");
};

export const fetchAuth = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/status`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response, "認証状態の取得に失敗しました。");
};
