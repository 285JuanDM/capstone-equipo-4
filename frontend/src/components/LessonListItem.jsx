import React from 'react';
import { Play, FileText, CheckCircle, Lock } from 'react-feather';
import '../styles/LessonListItem.css';

export default function LessonListItem({ lesson, status, onClick }) {
  const { title, contentType, duration } = lesson;

  const getIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="lesson-icon completed" />;
      case 'locked':
        return <Lock size={20} className="lesson-icon locked" />;
      case 'unlocked':
      default:
        switch (contentType) {
          case 'video':
            return <Play size={20} className="lesson-icon" />;
          case 'text':
            return <FileText size={20} className="lesson-icon" />;
          default:
            return <Play size={20} className="lesson-icon" />;
        }
    }
  };

  const isClickable = status === 'unlocked' || status === 'completed';

  return (
    <div 
      className={`lesson-item ${status} ${isClickable ? 'clickable' : ''}`}
      onClick={isClickable ? () => onClick(lesson.id) : null}
    >
      <div className="lesson-info">
        {getIcon()}
        <span className="lesson-title">{title}</span>
      </div>
      {duration && <span className="lesson-duration">{duration} min</span>}
    </div>
  );
}
