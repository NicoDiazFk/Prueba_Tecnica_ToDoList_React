import TaskItem from "./taskitem";
import "./tasklist.css";

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <div className="task-list-container">
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
}
