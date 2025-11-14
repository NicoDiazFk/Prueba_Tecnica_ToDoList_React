import "./header.css";
export default function Header({ totalTareas }) {
  return (
    <header className="header">
      <h1>Lista de Tareas</h1>
      <p>Total de tareas: {totalTareas}</p>
    </header>
  );
}