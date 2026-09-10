import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Cookie を送る
  headers: {
    "Content-Type": "application/json",
  },
});

// レスポンスインターセプター
api.interceptors.response.use(
  (response) => response, // 成功時はそのまま返す
  async (error) => {
    const originalRequest = error.config;

    // 401 が返ってきたら refresh API を試す
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 無限ループ防止

      try {
        await api.post("/refresh"); // リフレッシュAPI呼び出し
        // リフレッシュ成功したら元のリクエストを再送
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed. Please login again.");
        // ここでログイン画面にリダイレクトなど
      }
    }

    return Promise.reject(error);
  },
);

export default api;
