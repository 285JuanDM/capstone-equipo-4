import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  SidebarBadge,
  SidebarBook,
  SidebarHome,
  SidebarLibrary,
  SidebarLogout,
  SidebarProgress,
  SidebarToogle,
  SidebarTrophy,
} from "../assets/AppIcons";
import logo from "../assets/Logo.svg";
import { logOut } from "../services/authService";
import "../styles/Sidebar.css";

export default function Sidebar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const handleToggle = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { width: "20rem" },
    closed: { width: "4rem" },
  };

  const isActive = (path) => location.pathname === path;

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.email
  )}&background=random`;

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <motion.aside
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.25 }}
      variants={sidebarVariants}
      className="sidebar"
      style={{ alignItems: isOpen ? "" : "center" }}
    >
      {/* HEADER */}
      <section className="logo-header">
        <motion.div
          className="logo-container"
          animate={{
            opacity: isOpen ? 1 : 0,
            scale: isOpen ? 1 : 0.8,
          }}
          transition={{ duration: 0.25 }}
          style={{ display: isOpen ? "flex" : "none" }}
        >
          <img src={logo} alt="Logo Dolphi" className="logo-img" />
        </motion.div>

        <button className="toggle-btn" aria-label="Ocultar menú" onClick={handleToggle}>
          <SidebarToogle className={`toggle-icon ${isOpen ? "open" : "closed"}`} />
        </button>
      </section>

      {/* PERFIL */}
      <section
        className="profile"
      >
        <img src={avatarUrl} alt="Avatar" className="avatar" style={{marginLeft: isOpen ? "0" : "16px"}} />
        {isOpen && (
          <motion.div className="profile-info">
            <p className="name">{user.email}</p>
            <p className="level">Nivel 1</p>
          </motion.div>
        )}
      </section>

      {/* NAV */}
      <nav className="menu">
        <div className="menu-items">
          <Link to="/" className={`menu-item ${isActive("/") ? "active" : ""}`}>
            <SidebarHome className="icon" />
            {isOpen && "Inicio"}
          </Link>

          <Link
            to="/explore"
            className={`menu-item ${isActive("/explore") ? "active" : ""}`}
          >
            <SidebarBook className="icon" />
            {isOpen && "Explorar cursos"}
          </Link>

          <Link
            to="/mis-cursos"
            className={`menu-item ${isActive("/mis-cursos") ? "active" : ""}`}
          >
            <SidebarLibrary className="icon" />
            {isOpen && "Mis cursos"}
          </Link>

          <Link
            to="/ranking"
            className={`menu-item ${isActive("/ranking") ? "active" : ""}`}
          >
            <SidebarTrophy className="icon" />
            {isOpen && "Ranking"}
          </Link>

          <Link
            to="/my-progress"
            className={`menu-item ${isActive("/my-progress") ? "active" : ""}`}
          >
            <SidebarProgress className="icon" />
            {isOpen && "Mi Progreso"}
          </Link>

          <Link
            to="/badges"
            className={`menu-item ${isActive("/badges") ? "active" : ""}`}
          >
            <SidebarBadge className="icon" />
            {isOpen && "Mis Insignias"}
          </Link>
        </div>

        {/* LOGOUT */}
        <a onClick={handleLogout} className="menu-item logout">
          <SidebarLogout className="icon" />
          {isOpen && "Cerrar sesión"}
        </a>
      </nav>
    </motion.aside>
  );
}
