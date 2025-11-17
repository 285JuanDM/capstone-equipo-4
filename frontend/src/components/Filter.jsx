import React from 'react';
import '../styles/Filter.css';

const Filter = ({ categories, levels, onFilterChange }) => {
  return (
    <div className="filter-container">
      <select className="filter-select" onChange={(e) => onFilterChange('category', e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select className="filter-select" onChange={(e) => onFilterChange('level', e.target.value)}>
        <option value="">All Levels</option>
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
