import { useState } from "react";
import "./taskform.css";

export default function TaskForm({ onAddTask }) {
  //estados para form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("baja");
  const [status, setStatus] = useState("pendiente");

  //Enviar form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      alert("El nombre de la tarea es obligatorio");
      return;
    }

    const newTask = {
      id: Date.now(),
      name,
      description,
      dueDate,
      priority,
      status,
      completed: status === "completada" 
    };

    onAddTask(newTask);

    // Reset
    setName("");
    setDescription("");
    setDueDate("");
    setPriority("baja");
    setStatus("pendiente");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "16px" }}>
      <h2 className="subtitle">Crear tarea</h2>

      <input
        type="text"
        placeholder="Nombre de la tarea"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", marginBottom: "8px", padding: "8px", width: "100%" }}
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", marginBottom: "8px", padding: "8px", width: "100%" }}
      />
      <label>Fecha límite</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ display: "block", marginBottom: "12px", padding: "8px" }}
      />

      <fieldset style={{ marginBottom: "12px" }}>
        <legend>Prioridad</legend>

        <label>
          <input
            type="radio"
            name="priority"
            value="baja"
            checked={priority === "baja"}
            onChange={(e) => setPriority(e.target.value)}
          />
          Baja
        </label>

        <label style={{ marginLeft: "12px" }}>
          <input
            type="radio"
            name="priority"
            value="media"
            checked={priority === "media"}
            onChange={(e) => setPriority(e.target.value)}
          />
          Media
        </label>

        <label style={{ marginLeft: "12px" }}>
          <input
            type="radio"
            name="priority"
            value="alta"
            checked={priority === "alta"}
            onChange={(e) => setPriority(e.target.value)}
          />
          Alta
        </label>
      </fieldset>
      
      <label>Estado</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ display: "block", marginBottom: "12px", padding: "8px" }}
      >
        <option value="pendiente">Pendiente</option>
        <option value="en_proceso">En proceso</option>
        <option value="vencida">Vencida</option>
        <option value="completada">Completada</option>
      </select>

      <button
        type="submit"
        style={{
          padding: "8px 16px",
          backgroundColor: "#1e293b",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Agregar tarea
      </button>
    </form>
  );
}
