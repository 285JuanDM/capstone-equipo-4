import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="logo">🐬 Dolph<span className="highlight">i</span></div>

        <div className="profile">
          <img
            src="https://ui-avatars.com/api/?name=Carol+Henao"
            alt="Avatar"
            className="avatar"
          />
          <div>
            <p className="name">Carol Henao</p>
            <p className="level">Nivel 4</p>
          </div>
        </div>

        <nav className="menu">
          <a href="/" className="menu-item active">Inicio</a>
          <a href="/mis-cursos" className="menu-item">Mis cursos</a>
          <a href="/explorar" className="menu-item">Explorar cursos</a>
          <a href="/ranking" className="menu-item">Ranking</a>
        </nav>
      </div>

      <button className="logout">Cerrar sesión</button>
    </aside>
  );
}
