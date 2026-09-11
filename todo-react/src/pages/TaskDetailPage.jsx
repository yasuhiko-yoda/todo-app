import { useEffect, useState } from "react";
import {  useParams, useNavigate } from "react-router-dom";
import { TaskForm } from "../components/task/TaskForm";
import { fetchTask, updateTask } from "../api/taskApi";
import "./common.css";

export const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [taskContent, setTaskContent] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = await fetchTask(id);

        if (!task) {
          setMessage("指定されたタスクが見つかりません。");
          return;
        }

        setTaskContent(task.taskContent);
        setCompleted(task.completed);
      } catch (error) {
        console.error(error);
        setMessage("タスク一覧の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    if (!taskContent.trim()) {
      setMessage("タスク内容を入力してください。");
      return;
    }

    try {
      setSubmitting(true);
      await updateTask(id, {
        taskContent: taskContent.trim(),
        completed,
      });

      navigate("/tasks", {
        state: {
          message: "タスクを更新しました。",
        },
      });
    } catch (error) {
      console.error(error);
      // setMessage("タスクの更新に失敗しました。");
      if (error.status === 400) {
        setMessage(error.message || "入力内容を確認してください。");
      } else if (error.status === 401) {
        setMessage("ログインが必要です。");
      } else if (error.status === 403) {
        setMessage("この操作を行う権限がありません。");
      } else {
        setMessage(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };


  if (loading) {
    return <p>タスクを読み込んでいます。</p>;
  }

  return (
    <div>
      <section className="section">
        <h2>タスク編集</h2>

        {message && <p>{message}</p>}
        <p className="app-description">タスク編集ページです。</p>

        <p>タスクを編集してください。</p>
        <TaskForm
          taskContent={taskContent}
          onTaskContentChange={(event) => setTaskContent(event.target.value)}
          onSubmit={handleSubmit}
          buttonName={submitting ? "更新中" : "更新"}
          buttonVariant="secondary"
          cancelTo={`/tasks`}
        />

        {/* <Link
          to="/tasks"
          className="link-button edit-link button--primary button--medium"
        >
          キャンセル
        </Link> */}
      </section>
    </div>
  );
};

