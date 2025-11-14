export default function Sidebar({ filterStatus, setFilterStatus, filterPriority, setFilterPriority }) {
  return (
    <aside
      style={{
        width: "250px",
        backgroundColor: "#1e293b",
        color: "white",
        padding: "20px",
        position: "fixed",
        top: "80px",
        left: 0,
        height: "100%",
        boxSizing: "border-box"
      }}
    >
      <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Filtros</h2>

      {/*Filtrar por estado */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "16px" }}>Estado</h3>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "8px" }}
        >
          <option value="">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En proceso</option>
          <option value="vencida">Vencida</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      {/*filtrar por prioridad*/}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "16px" }}>Prioridad</h3>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "8px" }}
        >
          <option value="">Todas</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>
    </aside>
  );
}
