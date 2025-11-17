import React from 'react';
import '../styles/Filter.css';

export default function Filter({ onFilterChange }) {
  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  const handleLevelChange = (e) => {
    onFilterChange({ level: e.target.value });
  };

  return (
    <div className="filter-container">
      <div className="filter-group">
        <label htmlFor="category-select">Categoría:</label>
        <select id="category-select" onChange={handleCategoryChange}>
          <option value="">Todas</option>
          <option value="Desarrollo Web">Desarrollo Web</option>
          <option value="Diseño UX/UI">Diseño UX/UI</option>
          <option value="Marketing Digital">Marketing Digital</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="level-select">Nivel:</label>
        <select id="level-select" onChange={handleLevelChange}>
          <option value="">Todos</option>
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
      </div>
    </div>
  );
}
