import { Home, GraduationCap, Users, BookOpen, Menu } from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <Menu size={28} color="white" />
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-item active">
          <Home size={28} fill="currentColor" />
          {isOpen && <span className="sidebar-label">Início</span>}
        </div>
        <div className="sidebar-item">
          <GraduationCap size={28} />
          {isOpen && <span className="sidebar-label">Alunos</span>}
        </div>
        <div className="sidebar-item">
          <Users size={28} />
          {isOpen && <span className="sidebar-label">Turmas</span>}
        </div>
        <div className="sidebar-item">
          <BookOpen size={28} />
          {isOpen && <span className="sidebar-label">Cursos</span>}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-indicator"></div>
      </div>
    </aside>
  );
}
