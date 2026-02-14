import { Sidebar } from '../components/ui/Sidebar';
import { StudentCard } from '../components/students/Card';
import { useStudents } from '../hooks/use-students';
import './CommonLayout.css';
import { Student } from '../types/Students';

export default function Dashboard() {
   const {
      students
    } = useStudents();
  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-main">
        <header className="page-header">
          <div className="header-info">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Bem-vindo ao sistema de gestão escolar</p>
          </div>
        </header>

        <section className="page-content">
          <div className="section-header">
            <h2 className="section-title">Alunos Recentes</h2>
          </div>
          <div className="items-grid">
            {students.length > 0 ? (
              students.map((student: Student) => (
                <StudentCard
                  key={student.id}
                  name={student.name}
                  class_name={student.class_name}
                  address={student.address}
                  picture={student.picture}
                />
              ))
            ) : (
              <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>Nenhum aluno cadastrado.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
