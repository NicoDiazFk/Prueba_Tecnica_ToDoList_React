import { useState, useEffect } from "react";
import "./taskdialog.css";
import { IconClose } from "./icons.jsx";

export default function TaskDialog({ isOpen, onClose, onSave, taskToEdit = null }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [prioridad, setPrioridad] = useState("baja");
  const [estado, setEstado] = useState("pendiente");
  const [errores, setErrores] = useState({});

  const esModoEdicion = taskToEdit !== null;

  useEffect(() => {
    if (taskToEdit) {
      setNombre(taskToEdit.name || "");
      setDescripcion(taskToEdit.description || "");
      setFechaLimite(taskToEdit.dueDate || "");
      setPrioridad(taskToEdit.priority || "baja");
      setEstado(taskToEdit.status || "pendiente");
    } else {
      setNombre("");
      setDescripcion("");
      setFechaLimite("");
      setPrioridad("baja");
      setEstado("pendiente");
    }
    setErrores({});
  }, [taskToEdit, isOpen]);

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.name = "El nombre de la tarea es obligatorio";
    } else if (nombre.trim().length < 3) {
      nuevosErrores.name = "El nombre debe tener al menos 3 caracteres";
    } else if (nombre.trim().length > 100) {
      nuevosErrores.name = "El nombre no puede exceder 100 caracteres";
    }

    if (descripcion.length > 500) {
      nuevosErrores.description = "La descripción no puede exceder 500 caracteres";
    }

    if (fechaLimite) {
      const fechaSeleccionada = new Date(fechaLimite);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (isNaN(fechaSeleccionada.getTime())) {
        nuevosErrores.dueDate = "La fecha no es válida";
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const datosTarea = {
      id: esModoEdicion ? taskToEdit.id : Date.now(),
      name: nombre.trim(),
      description: descripcion.trim(),
      dueDate: fechaLimite || "",
      priority: prioridad,
      status: estado,
      completed: estado === "completada"
    };

    onSave(datosTarea);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>{esModoEdicion ? "Editar tarea" : "Crear tarea"}</h2>
          <button className="close-button" onClick={onClose} title="Cerrar">
            <IconClose />
          </button>
        </div>

        <form onSubmit={enviarFormulario}>
          <div className="form-field">
            <label>
              Nombre de la tarea <span className="required-field">*</span>
            </label>
            <input
              type="text"
              placeholder="Nombre de la tarea"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                if (errores.name) {
                  setErrores({ ...errores, name: "" });
                }
              }}
              className={errores.name ? "input-error" : ""}
              maxLength={100}
            />
            {errores.name && <span className="error-message">{errores.name}</span>}
            <span className="char-counter">{nombre.length}/100</span>
          </div>

          <div className="form-field">
            <label>Descripción</label>
            <textarea
              placeholder="Descripción (opcional)"
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
                if (errores.description) {
                  setErrores({ ...errores, description: "" });
                }
              }}
              className={errores.description ? "input-error" : ""}
              maxLength={500}
            />
            {errores.description && <span className="error-message">{errores.description}</span>}
            <span className="char-counter">{descripcion.length}/500</span>
          </div>

          <div className="form-field">
            <label>Fecha límite</label>
            <input
              type="date"
              value={fechaLimite}
              onChange={(e) => {
                setFechaLimite(e.target.value);
                if (errores.dueDate) {
                  setErrores({ ...errores, dueDate: "" });
                }
              }}
              className={errores.dueDate ? "input-error" : ""}
            />
            {errores.dueDate && <span className="error-message">{errores.dueDate}</span>}
            {!fechaLimite && <span className="field-hint">Sin fecha asignada</span>}
          </div>

          <div className="form-field">
            <label>Prioridad</label>
            <fieldset>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="baja"
                  checked={prioridad === "baja"}
                  onChange={(e) => setPrioridad(e.target.value)}
                />
                Baja
              </label>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="media"
                  checked={prioridad === "media"}
                  onChange={(e) => setPrioridad(e.target.value)}
                />
                Media
              </label>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="alta"
                  checked={prioridad === "alta"}
                  onChange={(e) => setPrioridad(e.target.value)}
                />
                Alta
              </label>
            </fieldset>
          </div>

          <div className="form-field">
            <label>Estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En proceso</option>
              <option value="vencida">Vencida</option>
              <option value="completada">Completada</option>
            </select>
          </div>

          <div className="dialog-actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">
              {esModoEdicion ? "Guardar cambios" : "Crear tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

