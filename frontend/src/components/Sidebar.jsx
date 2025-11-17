import { Link, useLocation } from "react-router-dom";
import {
  SidebarBook,
  SidebarHome,
  SidebarLibrary,
  SidebarLogout,
  SidebarTrophy,
} from "../assets/AppIcons";
import logo from "../assets/Logo.svg";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const location = useLocation(); // Hook para obtener la ruta actual

  // Helper para determinar si un enlace está activo
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <section className="logo-header">
        <div className="logo-container">
          <img src={logo} alt="Logo Dolphi" className="logo-img" />
        </div>
        <button className="toggle-btn" aria-label="Ocultar menú">
          {/* Icono del botón */}
        </button>
      </section>

      <section className="profile">
        <img
          src="https://ui-avatars.com/api/?name=Carol+Henao"
          alt="Avatar"
          className="avatar"
        />
        <div className="profile-info">
          <p className="name">Carol Henao</p>
          <p className="level">Nivel 4</p>
        </div>
      </section>

      <nav className="menu">
        <div className="menu-items">
          <Link to="/" className={`menu-item ${isActive('/') ? 'active' : ''}`}>
            <SidebarHome className="icon" />
            Inicio
          </Link>
          <Link to="/mis-cursos" className={`menu-item ${isActive('/mis-cursos') ? 'active' : ''}`}>
            <SidebarLibrary className="icon" />
            Mis cursos
          </Link>
          <Link to="/my-progress" className={`menu-item ${isActive('/my-progress') ? 'active' : ''}`}>
            <SidebarTrophy className="icon" />
            Mi Progreso
          </Link>
          <Link to="/explore" className={`menu-item ${isActive('/explore') ? 'active' : ''}`}>
            <SidebarBook className="icon" />
            Explorar cursos
          </Link>
          <Link to="/ranking" className={`menu-item ${isActive('/ranking') ? 'active' : ''}`}>
            <SidebarTrophy className="icon" />
            Ranking
          </Link>
          <Link to="/badges" className={`menu-item ${isActive('/badges') ? 'active' : ''}`}>
            <SidebarTrophy className="icon" />
            Mis Insignias
          </Link>
        </div>

        <a className="menu-item logout">
          <SidebarLogout className="icon" />
          Cerrar sesión
        </a>
      </nav>
    </aside>
  );
}
