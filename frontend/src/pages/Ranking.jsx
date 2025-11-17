import React from 'react';
import '../styles/Ranking.css'; // Crearemos este archivo para los estilos

// Datos hardcodeados de estudiantes
const hardcodedStudents = [
  { id: 1, name: 'Carol Henao', points: 1500, avatar: 'https://ui-avatars.com/api/?name=Carol+Henao' },
  { id: 2, name: 'Julián Alvarado', points: 1350, avatar: 'https://ui-avatars.com/api/?name=Julian+Alvarado' },
  { id: 3, name: 'Laura Rodríguez', points: 1200, avatar: 'https://ui-avatars.com/api/?name=Laura+Rodriguez' },
  { id: 4, name: 'Carlos Pérez', points: 1050, avatar: 'https://ui-avatars.com/api/?name=Carlos+Perez' },
  { id: 5, name: 'Ana Gómez', points: 900, avatar: 'https://ui-avatars.com/api/?name=Ana+Gomez' },
].sort((a, b) => b.points - a.points); // Ordenar por puntos de mayor a menor

export default function Ranking() {
  return (
    <div className="ranking-container">
      <h1>Ranking de Estudiantes</h1>
      <p>¡Mira quién lidera la tabla y esfuérzate por llegar a la cima!</p>
      <ol className="ranking-list">
        {hardcodedStudents.map((student, index) => (
          <li key={student.id} className="ranking-item">
            <span className="rank">{index + 1}</span>
            <img src={student.avatar} alt={student.name} className="avatar" />
            <span className="name">{student.name}</span>
            <span className="points">{student.points} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
