import { Search } from "../assets/AppIcons";
import "../styles/Topbar.css";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Busca tus cursos favoritos..."
          className="search-input"
        />
      </div>
    </header>
  );
}
