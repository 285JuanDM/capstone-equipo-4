import React, { useEffect, useState } from 'react';
import { getRankingData } from '../services/rankingService'; // Importar el servicio
import '../styles/Ranking.css';

export default function Ranking() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRanking() {
      try {
        setLoading(true);
        const rankingData = await getRankingData();
        setStudents(rankingData);
        setError(null);
      } catch (err) {
        setError('No se pudo cargar el ranking. Inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRanking();
  }, []); // El array vacío asegura que se ejecute solo una vez

  return (
    <div className="ranking-container">
      <h1>Ranking de Estudiantes</h1>
      <p>¡Mira quién lidera la tabla y esfuérzate por llegar a la cima!</p>

      {loading && <p>Cargando ranking...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <ol className="ranking-list">
          {students.map((student, index) => (
            <li key={student.id} className="ranking-item">
              <span className="rank">{index + 1}</span>
              <img src={student.avatar} alt={student.name} className="avatar" />
              <span className="name">{student.name}</span>
              <span className="points">{student.points} pts</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
