import { Button } from "../common/Button";
import { Link } from "react-router-dom";
import './TaskFrom.css'

export const TaskForm = ({
  taskContent,
  onTaskContentChange,
  onSubmit,
  buttonName,
  buttonVariant = "primary",
  disabled,
  cancelTo
}) => {
  return (
    <form onSubmit={onSubmit} className="task-form">
      <p>
        <label htmlFor="taskContent">タスク内容</label>
      </p>
      <div className="task-input-area">
        <input
          id="taskContent"
          type="text"
          value={taskContent}
          onChange={onTaskContentChange}
          required
        />

        <Button
          type="submit"
          size="medium"
          variant={buttonVariant}
          btnName={buttonName}
          disabled={disabled}
        />
        {cancelTo && (
          <Link
            to={cancelTo}
            className="link-button button--secondary button--medium"
          >
            キャンセル
          </Link>
        )}
      </div>
    </form>
  );
};
