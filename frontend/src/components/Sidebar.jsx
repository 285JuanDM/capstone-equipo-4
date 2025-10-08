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
  return (
    <aside className="sidebar">
      <section className="logo-header">
        <div className="logo-container">
          <img src={logo} alt="Logo Dolphi" className="logo-img" />
        </div>

        <button className="toggle-btn" aria-label="Ocultar menú">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#0062DB"
            className="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
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
          <a href="/" className="menu-item active">
            <SidebarHome className="icon" />
            Inicio
          </a>
          <a href="/mis-cursos" className="menu-item">
            <SidebarLibrary className="icon" />
            Mis cursos
          </a>
          <a href="/explorar" className="menu-item">
            <SidebarBook className="icon" />
            Explorar cursos
          </a>
          <a href="/ranking" className="menu-item">
            <SidebarTrophy className="icon" />
            Ranking
          </a>
        </div>

        <a className="menu-item logout">
          <SidebarLogout className="icon" />
          Cerrar sesión
        </a>
      </nav>
    </aside>
  );
}
