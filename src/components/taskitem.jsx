import "./taskitem.css";
import { IconEdit, IconCheck, IconClose, IconDelete } from "./icons.jsx";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <li className="task-item">
      <div className="task-item-content">
        <div className="task-item-header">
          <strong className="task-item-name">
            {task.name}
          </strong>
          <span className={`status-badge ${task.status}`}>
            {task.status.replace("_", " ")}
          </span>
        </div>

        {task.description && (
          <p className="task-item-description">
            {task.description}
          </p>
        )}

        <small className="task-item-date">
          Fecha límite: {task.dueDate ? new Date(task.dueDate).toLocaleDateString('es-ES') : "Sin fecha asignada"}
        </small>
      </div>

      <div className="task-item-actions">
        <div className="priority-wrapper">
          <span className="priority-label">Prioridad:</span>
          <span className={`priority-text ${task.priority}`}>
            {task.priority}
          </span>
        </div>

        <button
          className="task-item-button task-item-button-edit"
          onClick={() => onEdit(task)}
          title="Editar tarea"
        >
          <IconEdit />
        </button>

        <button
          className={`task-item-button task-item-button-toggle ${task.completed ? "completed" : ""}`}
          onClick={() => onToggle(task.id)}
          title={task.completed ? "Desmarcar como completada" : "Marcar como completada"}
        >
          {task.completed ? <IconClose /> : <IconCheck />}
        </button>
        <button
          className="task-item-button task-item-button-delete"
          onClick={() => onDelete(task.id)}
          title="Eliminar tarea"
        >
          <IconDelete />
        </button>
      </div>
    </li>
  );
}
