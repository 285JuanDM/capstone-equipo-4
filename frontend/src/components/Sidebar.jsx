import { motion } from "framer-motion";
import { useState } from "react";
import {
  SidebarBook,
  SidebarHome,
  SidebarIcon,
  SidebarLibrary,
  SidebarLogout,
  SidebarTrophy,
} from "../assets/AppIcons";
import logo from "../assets/Logo.svg";
import "../styles/Sidebar.css";
import { SidebarItem } from "./SidebarItem";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Inicio");

  const handleToggle = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { width: "16rem" },
    closed: { width: "4rem" },
  };

  const menuItems = [
    { text: "Inicio", icon: <SidebarHome className="icon" /> },
    { text: "Mis cursos", icon: <SidebarLibrary className="icon" /> },
    { text: "Explorar cursos", icon: <SidebarBook className="icon" /> },
    { text: "Logros", icon: <SidebarTrophy className="icon" /> },
  ];

  return (
    <motion.aside
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.25 }}
      variants={sidebarVariants}
      className="sidebar"
      style={{ alignItems: isOpen ? "" : "center" }}
    >
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

        
          <button
            className="toggle-btn"
            aria-label="Ocultar menú"
            onClick={handleToggle}
          >
            <SidebarIcon className={`toggle-icon ${isOpen ? "open" : "closed"}`} />
          </button>
      </section>

      <section className="profile">
        <img
          src="https://ui-avatars.com/api/?name=Carol+Henao"
          alt="Avatar"
          className="avatar"
        />
        {isOpen && (
          <motion.div
            className="profile-info"
          >
            <p className="name">Carol Henao</p>
            <p className="level">Nivel 4</p>
          </motion.div>
        )}
      </section>

      <nav className="menu">
        <div className="menu-items">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.text}
              itemText={item.text}
              icon={item.icon}
              isOpen={isOpen}
              active={activeItem === item.text}
              onClick={() => setActiveItem(item.text)}
            />
          ))}
        </div>

        <a className="menu-item logout">
          <SidebarLogout className="icon" />
          {isOpen && <span>Cerrar sesión</span>}
        </a>
      </nav>
    </motion.aside>
  );
}
