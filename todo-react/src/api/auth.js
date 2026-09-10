const API_BASE_URL = "http://localhost:8080/api";

export const fetchAuth = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/status`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("認証状態を取得できませんでした。");
  }

  return await response.json();

//   const data = await response.json();
};
