import { Link, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../services/authService";
import {
  SidebarBook,
  SidebarHome,
  SidebarLibrary,
  SidebarLogout,
  SidebarTrophy,
} from "../assets/AppIcons";
import logo from "../assets/Logo.svg";
import "../styles/Sidebar.css";

export default function Sidebar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  // Generar el avatar a partir del correo electrónico
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.email
  )}&background=random`;

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
          src={avatarUrl}
          alt="Avatar"
          className="avatar"
        />
        <div className="profile-info">
          <p className="name">{user.email}</p>
          <p className="level">Nivel 1</p> {/* Nivel estático por ahora */}
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

        <a onClick={handleLogout} className="menu-item logout">
          <SidebarLogout className="icon" />
          Cerrar sesión
        </a>
      </nav>
    </aside>
  );
}
