import "../styles/Topbar.css";

export default function Topbar() {
  return (
    <div className="topbar">
      <input
        type="text"
        placeholder="Busca tus cursos favoritos..."
        className="search-input"
      />
    </div>
  );
}
