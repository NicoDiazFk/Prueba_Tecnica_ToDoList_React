import { useState, useEffect } from "react";
import Header from "./components/header.jsx";
import Filters from "./components/filters.jsx";
import TaskList from "./components/tasklist.jsx";
import TaskDialog from "./components/taskdialog.jsx";
import "./App.css";

export default function App() {
  const cargarTareas = () => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      return JSON.parse(tareasGuardadas);
    }
    return [
      {
        id: 1,
        name: "Estudiar React",
        description: "",
        dueDate: "2025-11-10",
        priority: "media",
        status: "pendiente",
        completed: false,
      },
      {
        id: 2,
        name: "Hacer prueba técnica",
        description: "",
        dueDate: "2025-11-30",
        priority: "alta",
        status: "en_proceso",
        completed: false,
      },
    ];
  };

  const [tareas, setTareas] = useState(cargarTareas);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroPrioridad, setFiltroPrioridad] = useState("");
  const [estaAbiertoDialog, setEstaAbiertoDialog] = useState(false);
  const [tareaAEditar, setTareaAEditar] = useState(null);
  const [nombreRapido, setNombreRapido] = useState("");
  const [errorNombreRapido, setErrorNombreRapido] = useState("");

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const cambiarEstadoTarea = (id) => {
    setTareas((anteriores) =>
      anteriores.map((tarea) =>
        tarea.id === id
          ? {
              ...tarea,
              completed: !tarea.completed,
              status: !tarea.completed ? "completada" : "pendiente",
            }
          : tarea
      )
    );
  };

  const agregarTarea = (nuevaTarea) => {
    setTareas((tareasAnteriores) => [...tareasAnteriores, nuevaTarea]);
  };

  const actualizarTarea = (tareaActualizada) => {
    setTareas((tareasAnteriores) =>
      tareasAnteriores.map((tarea) =>
        tarea.id === tareaActualizada.id ? tareaActualizada : tarea
      )
    );
  };

  const guardarTarea = (datosTarea) => {
    if (tareaAEditar) {
      actualizarTarea(datosTarea);
    } else {
      agregarTarea(datosTarea);
    }
    setTareaAEditar(null);
    setNombreRapido("");
  };

  const abrirDialogCrear = () => {
    setTareaAEditar(null);
    setEstaAbiertoDialog(true);
  };

  const abrirDialogEditar = (tarea) => {
    setTareaAEditar(tarea);
    setEstaAbiertoDialog(true);
  };

  const cerrarDialog = () => {
    setEstaAbiertoDialog(false);
    setTareaAEditar(null);
  };

  const crearTareaRapida = (e) => {
    e.preventDefault();
    const nombreLimpio = nombreRapido.trim();
    
    if (nombreLimpio === "") {
      setErrorNombreRapido("El nombre de la tarea es obligatorio");
      return;
    }
    
    if (nombreLimpio.length < 2) {
      setErrorNombreRapido("El nombre de la tarea debe tener al menos 2 caracteres");
      return;
    }
    
    if (nombreLimpio.length > 100) {
      setErrorNombreRapido("El nombre de la tarea no puede exceder 100 caracteres");
      return;
    }
    
    const nuevaTarea = {
      id: Date.now(),
      name: nombreLimpio,
      description: "",
      dueDate: "",
      priority: "baja",
      status: "pendiente",
      completed: false
    };
    agregarTarea(nuevaTarea);
    setNombreRapido("");
    setErrorNombreRapido("");
  };

  const estaVencida = (tarea) => {
    if (!tarea.dueDate) return false;
    const hoy = new Date();
    const fechaVencimiento = new Date(tarea.dueDate);

    hoy.setHours(0, 0, 0, 0);
    fechaVencimiento.setHours(0, 0, 0, 0);

    return fechaVencimiento < hoy && !tarea.completed;
  };

  useEffect(() => {
    const tareasActualizadas = tareas.map((tarea) =>
      estaVencida(tarea) && tarea.status !== "completada"
        ? { ...tarea, status: "vencida" }
        : tarea
    );

    if (JSON.stringify(tareasActualizadas) !== JSON.stringify(tareas)) {
      setTareas(tareasActualizadas);
    }
  }, [tareas]);

  const tareasFiltradas = tareas.filter((tarea) => {
    const coincideEstado = filtroEstado ? tarea.status === filtroEstado : true;
    const coincidePrioridad = filtroPrioridad ? tarea.priority === filtroPrioridad : true;

    return coincideEstado && coincidePrioridad;
  });
  
  const eliminarTarea = (id) => {
    setTareas((tareasAnteriores) => tareasAnteriores.filter((tarea) => tarea.id !== id));
  };

  return (
    <div className="body">
      <Header totalTareas={tareas.length} />

      <div className="main-content">
        <div className="quick-task-form-container">
          <form onSubmit={crearTareaRapida}>
            <div className="quick-task-form">
              <div className="quick-task-form-input-wrapper">
                <label className="quick-task-form-label">
                  Nueva tarea
                </label>
                <input
                  type="text"
                  placeholder="Nombre de la tarea"
                  value={nombreRapido}
                  onChange={(e) => {
                    setNombreRapido(e.target.value);
                    if (errorNombreRapido) {
                      setErrorNombreRapido("");
                    }
                  }}
                  className={`quick-task-form-input ${errorNombreRapido ? "input-error" : ""}`}
                  maxLength={100}
                />
                {errorNombreRapido && (
                  <span className="quick-task-form-error">{errorNombreRapido}</span>
                )}
                <button
                  type="button"
                  onClick={abrirDialogCrear}
                  className="quick-task-form-more-options-btn"
                >
                  Más opciones
                </button>
              </div>
              <div className="quick-task-form-submit-wrapper">
                <button
                  type="submit"
                  className="quick-task-form-submit-btn"
                >
                  Crear
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="filters-wrapper">
          <Filters
            filterStatus={filtroEstado}
            setFilterStatus={setFiltroEstado}
            filterPriority={filtroPrioridad}
            setFilterPriority={setFiltroPrioridad}
          />
        </div>
        <TaskList 
          tasks={tareasFiltradas} 
          onToggle={cambiarEstadoTarea} 
          onDelete={eliminarTarea}
          onEdit={abrirDialogEditar}
        />
      </div>

      <TaskDialog
        isOpen={estaAbiertoDialog}
        onClose={cerrarDialog}
        onSave={guardarTarea}
        taskToEdit={tareaAEditar}
      />
    </div>
  );
}
