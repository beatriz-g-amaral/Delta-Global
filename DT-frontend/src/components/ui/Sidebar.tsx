import { Home, GraduationCap, Users, BookOpen, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tooltip } from './Tooltip';
import './Sidebar.css';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Início', Icon: Home },
    { path: '/students', label: 'Alunos', Icon: GraduationCap },
    { path: '/classes', label: 'Turmas', Icon: Users },
    { path: '/teachers', label: 'Professores', Icon: BookOpen },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <Menu size={28} color="white" />
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Tooltip
              key={item.path}
              text={item.label}
              disabled={isOpen}
              position="bottom"
            >
              <div
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavigation(item.path)}
              >
                <item.Icon
                  size={28}
                  fill={isActive ? 'currentColor' : 'transparent'}
                />
                {isOpen && <span className="sidebar-label">{item.label}</span>}
              </div>
            </Tooltip>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <Tooltip text="Sair" disabled={isOpen} position="bottom">
          <div className="sidebar-item logout" onClick={handleLogout}>
            <LogOut size={28} />
            {isOpen && <span className="sidebar-label">Sair</span>}
          </div>
        </Tooltip>
        <div className="sidebar-indicator"></div>
      </div>
    </aside>
  );
}