import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LinkButton } from '../components/common/LinkButton'
import { Button } from "../components/common/Button";
import { TaskForm } from "../components/task/TaskForm";
import { createTask, deleteTask, fetchTasks, updateTask } from "../api/taskApi";
import "./common.css";
import "./TaskListPage.css"

export const TaskListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(() => location.state?.message ?? "");
  const [accessDenied, setAccessDenied] = useState(false);
  const [taskContent, setTaskContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateForm = (event) => {
    setTaskContent(event.target.value);
  };

  const loadTasks = async () => {
    // fetchTasks内でJSONへ変換している場合
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    // メッセージを取り込んだ後、履歴に残ったstateを削除
    if (location.state?.message) {
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [location.pathname, location.state?.message, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await loadTasks();
      } catch (error) {
        console.error(error);

        if (error.status === 401 || error.status === 403) {
          setAccessDenied(true);
        } else {
          setMessage("タスク一覧の取得に失敗しました。");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleComplete = async (task) => {
    setMessage("");

    try {
      await updateTask(task.taskId, {
        taskContent: task.taskContent,
        completed: !task.completed,
      });

      await loadTasks();
      // setMessage("タスクを完了しました。");
    } catch (error) {
      console.error(error);
      setMessage("タスクの完了処理に失敗しました。");
    }
  };

  const handleDelete = async (taskId) => {
    // console.log("削除するタスクID", taskId);
    setMessage("");
    try {
      const isConfirmed = window.confirm("本当に削除しますか？");
      if (isConfirmed) {
        await deleteTask(taskId);
      }

      await loadTasks();
    } catch (error) {
      console.error(error);
      setMessage("タスクの削除に失敗しました。");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    if (!taskContent.trim()) {
      setMessage("タスク内容を入力してください。");
      return;
    }
    try {
      setSubmitting(true);
      await createTask({
        taskContent: taskContent.trim(),
        completed: false,
      });

      setTaskContent("");
      await loadTasks();

      setMessage("タスクを登録しました。");
    } catch (error) {
      console.error(error);
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

  if (accessDenied) {
    return <p>タスクを取得する権限がありません。</p>;
  }

  return (
    <div>
      <section className="section">
        <h2>タスク一覧</h2>
        <p className="app-description">タスク一覧です。</p>
        <p>編集・完了・削除を行うことができます。</p>

        {message && <p>{message}</p>}

        {tasks.length === 0 ? (
          <p>登録されているタスクはありません。</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.taskId}>
                <span className={task.completed ? "completed" : ""}>
                  {task.taskContent}
                </span>

                <div className="list-button-area">
                  <LinkButton
                    variant="secondary"
                    size="min"
                    to={`/tasks/${task.taskId}`}
                    btnName="編集"
                  />

                  <Button
                    type="button"
                    size="min"
                    variant={task.completed ? "restore" : "complete"}
                    btnName={task.completed ? "戻す" : "完了"}
                    onClick={() => handleComplete(task)}
                  />

                  <Button
                    type="button"
                    size="min"
                    variant="danger"
                    btnName="削除"
                    onClick={() => handleDelete(task.taskId)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="section task-registration">
        <h2>タスク登録</h2>
        <p className="app-description">タスクを登録してください。</p>
        <TaskForm
          size="medium"
          taskContent={taskContent}
          onTaskContentChange={updateForm}
          onSubmit={handleSubmit}
          buttonName={submitting ? "登録中" : "登録する"}
          disabled={submitting}
        />
      </section>
    </div>
  );
};
