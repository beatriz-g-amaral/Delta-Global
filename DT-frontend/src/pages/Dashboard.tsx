import { Sidebar } from '../components/ui/Sidebar';
import { StudentCard } from '../components/students/Card';
import { useDashboard } from '../hooks/use-dashboard';
import './Dashboard.css';
import { Student } from '../types/Students';

export default function Dashboard() {
   const {
      getLastStudents
    } = useDashboard();
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-info">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Bem-vindo ao sistema de gestão escolar</p>
          </div>
        </header>

        <section className="dashboard-content">
          <div className="section-header">
            <h2 className="section-title">Alunos Recentes</h2>
            <button className="view-all-btn">Ver todos</button>
          </div>
          <div className="students-list">
            {getLastStudents.map((student: Student) => (
              <StudentCard
                key={student.id}
                name={student.name}
                className={student.class_name}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
