import { useState, useEffect, useRef } from "react";
import "./filters.css";
import { IconFilter, IconClose } from "./icons.jsx";

export default function Filters({ filterStatus, setFilterStatus, filterPriority, setFilterPriority }) {
  const [estaAbierto, setEstaAbierto] = useState(false);
  const referenciaContenedor = useRef(null);

  useEffect(() => {
    const manejarClicFuera = (evento) => {
      if (referenciaContenedor.current && !referenciaContenedor.current.contains(evento.target)) {
        setEstaAbierto(false);
      }
    };

    if (estaAbierto) {
      document.addEventListener("mousedown", manejarClicFuera);
    }

    return () => {
      document.removeEventListener("mousedown", manejarClicFuera);
    };
  }, [estaAbierto]);

  const tieneFiltrosActivos = filterStatus || filterPriority;

  const limpiarFiltros = () => {
    setFilterStatus("");
    setFilterPriority("");
  };

  return (
    <div className="filters-container" ref={referenciaContenedor}>
      <button
        className={`filters-toggle ${tieneFiltrosActivos ? "active" : ""}`}
        onClick={() => setEstaAbierto(!estaAbierto)}
      >
        <IconFilter />
        <span>Filtros</span>
        {tieneFiltrosActivos && (
          <span className="filter-badge">
            {(filterStatus ? 1 : 0) + (filterPriority ? 1 : 0)}
          </span>
        )}
      </button>

      {estaAbierto && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filtros</h3>
            {tieneFiltrosActivos && (
              <button className="clear-filters-btn" onClick={limpiarFiltros}>
                Limpiar
              </button>
            )}
          </div>

          <div className="filter-group">
            <label>Estado</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En proceso</option>
              <option value="vencida">Vencida</option>
              <option value="completada">Completada</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Prioridad</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>
        </div>
      )}

      {tieneFiltrosActivos && (
        <div className="active-filters">
          {filterStatus && (
            <span className="active-filter-tag">
              Estado: {filterStatus.replace("_", " ")}
              <button onClick={() => setFilterStatus("")} title="Quitar filtro">
                <IconClose />
              </button>
            </span>
          )}
          {filterPriority && (
            <span className="active-filter-tag">
              Prioridad: {filterPriority}
              <button onClick={() => setFilterPriority("")} title="Quitar filtro">
                <IconClose />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

