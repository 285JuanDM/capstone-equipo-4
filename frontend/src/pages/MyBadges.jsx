import React, { useEffect, useState } from 'react';
import { getUserBadges } from '../services/badgeService';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../styles/MyBadges.css';

export default function MyBadges() {
  const { user } = useAuth(); // Hook para obtener el usuario del contexto
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Nos aseguramos de que el objeto user y su email existan
    if (!user || !user.email) {
      setLoading(false);
      setError("No se ha podido identificar al usuario.");
      return;
    }

    async function fetchBadges() {
      try {
        setLoading(true);
        // Usamos el email del usuario logueado dinámicamente
        const userBadges = await getUserBadges(user.email);
        setBadges(userBadges);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar tus insignias. Inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBadges();
  }, [user]); // El efecto se ejecuta cuando el objeto user cambia

  const formatDate = (date) => {
    if (date && date.toDate) {
      return date.toDate().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return 'Fecha desconocida';
  };

  return (
    <div className="my-badges-container">
      <h1>Mis Insignias</h1>
      <p>Aquí puedes ver todas las insignias que has ganado por completar cursos.</p>

      {loading && <p>Cargando insignias...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && badges.length > 0 && (
        <div className="badges-gallery">
          {badges.map(badge => (
            <div key={badge.id} className="badge-card">
              <img src={badge.imageUrl} alt={badge.badgeName} className="badge-image" />
              <div className="badge-info">
                <h3 className="badge-name">{badge.badgeName}</h3>
                <p className="badge-date">Otorgada el: {formatDate(badge.awardedAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && badges.length === 0 && (
        <div className="no-badges-message">
          <p>¡Aún no has ganado ninguna insignia!</p>
          <p>Completa un curso al 100% para ganar tu primera insignia y verla aquí.</p>
        </div>
      )}
    </div>
  );
}
