import React from 'react';
import '../students/Card.css';

interface ClassCardProps {
  name: string;
  teacher_name?: string;
}

export const ClassCard: React.FC<ClassCardProps> = ({ name, teacher_name }) => {
  return (
    <div className="class-card">
      <div className="class-card-icon">
        <span className="icon">🏫</span>
      </div>
      <div className="class-card-info">
        <h3 className="class-name">{name}</h3>
        <p className="teacher-name">
          {teacher_name ? `Professor: ${teacher_name}` : 'Sem professor atribuído'}
        </p>
      </div>
    </div>
  );
};
