import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { fetchTasks, updateTask } from "../api/taskApi";
import "./common.css";

export const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [taskContent, setTaskContent] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTasks();

        setTasks(data);

        const selectedTask = data.find((task) => String(task.taskId) === id);

        if (!selectedTask) {
          setMessage("指定されたタスクが見つかりません。");
          return;
        }

        setTaskContent(selectedTask.taskContent);
        setCompleted(selectedTask.completed);
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
    }finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>タスクを読み込んでいます。</p>;
  }

  return (
    <div>
      <h2>タスク一覧・編集</h2>

      {message && <p>{message}</p>}

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.taskId}>
            {String(task.taskId) === id ? (
              <form onSubmit={handleSubmit}>
                <label htmlFor={`task-${task.taskId}`}>タスク内容</label>

                <input
                  id={`task-${task.taskId}`}
                  type="text"
                  value={taskContent}
                  onChange={(event) => setTaskContent(event.target.value)}
                  required
                />

                <Button
                  btnColor="white"
                  btnBgColor="red"
                  btnName={submitting ? "更新中..." : "更新する"}
                  disabled={submitting}
                  size="medium"
                />

                <Link to="/tasks">キャンセル</Link>
              </form>
            ) : (
              <div>
                <span className={task.completed ? "completed" : ""}>
                  {task.taskContent}
                </span>
                <Link to={`/tasks/${task.taskId}`}>編集</Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
