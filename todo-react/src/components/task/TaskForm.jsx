import { Button } from "../common/Button";
import { LinkButton } from "../common/LinkButton";
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
          <LinkButton 
            to={cancelTo}
            variant="secondary"
            size="medium"
            btnName="キャンセル"
          />
        )}
      </div>
    </form>
  );
};
