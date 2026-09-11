import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { TaskListPage } from "./pages/TaskListPage";

import { TaskDetailPage } from "./pages/TaskDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./pages/NotFound";



function App() {
	return (
    
      <Routes>
        {/* 最初に開いた場合はログインページへ遷移 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/tasks" element={<Layout />}>
          <Route index element={<TaskListPage />} />

          {/* タスク詳細ページ */}
          <Route path=":id" element={<TaskDetailPage />} />
        </Route>
        {/* ログインページ */}
        <Route path="/login" element={<LoginPage />} />
        {/* NotFoundページ */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    
  );
}

export default App;