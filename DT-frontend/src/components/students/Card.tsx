import { User } from 'lucide-react';
import './Card.css';
import { Student } from '../../types/Students';



export function StudentCard({ name, class_name, address, picture }: Partial<Student>) {
  return (
    <div className="student-card">
      <div className="student-avatar">
        {picture ? (
          <img src={picture} alt={name} className="student-avatar-img" />
        ) : (
          <User size={48} fill="currentColor" />
        )}
      </div>
      <div className="student-info">
        <div className="student-header">
          <span className="student-name">{name}</span>
          <span className="student-class">{class_name}</span>
        </div>
        <div className="student-occurrence">
          Endereço: {address || 'Não informado'}
        </div>
      </div>
    </div>
  );
}
