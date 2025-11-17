import React from 'react';
import { Play, FileText } from 'react-feather';
import '../styles/LessonListItem.css';

export default function LessonListItem({ lesson }) {
  const { title, contentType, duration } = lesson;

  const getIcon = () => {
    // Usamos un switch para poder añadir más tipos de contenido en el futuro
    switch (contentType) {
      case 'video':
        return <Play size={20} className="lesson-icon" />;
      case 'text':
        return <FileText size={20} className="lesson-icon" />;
      default:
        return <Play size={20} className="lesson-icon" />;
    }
  };

  return (
    <div className="lesson-item">
      {getIcon()}
      <span className="lesson-title">{title}</span>
      {duration && <span className="lesson-duration">{duration} min</span>}
    </div>
  );
}
