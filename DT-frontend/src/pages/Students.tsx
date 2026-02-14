import { useState } from 'react';
import { Sidebar } from '../components/ui/Sidebar';
import { StudentCard } from '../components/students/Card';
import { useStudents } from '../hooks/use-students';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import './CommonLayout.css';
import { Student } from '../types/Students';
import { Input } from '../components/ui/Input';
import { useClasses } from '../hooks/use-classes';

import { useNavigate } from 'react-router-dom';

export default function Students() {
  const navigate = useNavigate();
  const { students, error, setError, removeStudent, addStudent, updateStudent, fetchStudentsWithFilters } = useStudents();
  const { classes } = useClasses();
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNoClassesModalOpen, setIsNoClassesModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    class_id: '',
  });
  const [pictureFile, setPictureFile] = useState<File | undefined>(undefined);

  const handleSelectStudent = (id: number) => {
    setSelectedStudentId(prevId => (prevId === id ? null : id));
  };

  const handleDelete = async () => {
    if (selectedStudentId) {
      setIsSubmitting(true);
      try {
        await removeStudent(selectedStudentId);
        setSelectedStudentId(null);
        setIsDeleteModalOpen(false);
        await fetchStudentsWithFilters({});
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPictureFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      class_id: '',
    });
    setPictureFile(undefined);
  };

  const handleAdd = async () => {
    if (!formData.class_id) {
      alert('Por favor, selecione uma turma.');
      return;
    }
    setIsSubmitting(true);
    try {
      await addStudent({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        class_id: Number(formData.class_id),
        pictureFile: pictureFile,
      });
      setIsAddModalOpen(false);
      resetForm();
      await fetchStudentsWithFilters({});
    } catch (err) {
      console.error("Error adding student:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = () => {
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name,
        email: selectedStudent.email,
        phone: selectedStudent.phone,
        address: selectedStudent.address || '',
        class_id: String(selectedStudent.class_id),
      });
      setIsEditModalOpen(true);
    }
  };

  const handleUpdate = async () => {
    if (selectedStudentId && selectedStudent) {
      if (!formData.class_id) {
        alert('Por favor, selecione uma turma.');
        return;
      }
      setIsSubmitting(true);
      try {
        await updateStudent({
          ...selectedStudent,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          class_id: Number(formData.class_id),
          pictureFile: pictureFile || undefined,
        });
        setIsEditModalOpen(false);
        resetForm();
        await fetchStudentsWithFilters({});
      } catch (err) {
        console.error("Error updating student:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-main">
        <header className="page-header">
          <div className="header-info">
            <h1 className="page-title">Alunos</h1>
            <p className="page-subtitle">Gerencie os alunos do sistema</p>
          </div>
        </header>

        <div className="page-layout">
          <section className="page-content">
            <div className="section-header">
              <h2 className="section-title">Todos os alunos</h2>
              <div className="section-actions">
                <button
                  className="add-btn"
                  onClick={() => {
                    if (classes.length === 0) {
                      setIsNoClassesModalOpen(true);
                    } else {
                      setIsAddModalOpen(true);
                    }
                  }}
                >
                  Adicionar aluno
                </button>
              </div>
            </div>
            <div className="items-grid">
              {students.map((student: Student) => (
                <div
                  key={student.id}
                  className={`item-wrapper ${selectedStudentId === student.id ? 'selected' : ''}`}
                  onClick={() => handleSelectStudent(student.id)}
                >
                  <StudentCard
                    name={student.name}
                    class_name={student.class_name}
                    address={student.address}
                    picture={student.picture}
                  />
                </div>
              ))}
            </div>
          </section>

          {selectedStudent && (
            <aside className="actions-panel">
              <div className="panel-header">
                <h3>Ações</h3>
                <button className="close-panel" onClick={() => setSelectedStudentId(null)}>×</button>
              </div>
              <div className="panel-content">
                <div className="selected-info">
                  <div className="student-profile-summary">
                    {selectedStudent.picture ? (
                      <img src={selectedStudent.picture} alt={selectedStudent.name} className="panel-avatar" />
                    ) : (
                      <div className="panel-avatar-placeholder">
                        <span className="avatar-letter">{selectedStudent.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="summary-text">
                      <p className="selected-name">{selectedStudent.name}</p>
                      <p className="selected-class">{selectedStudent.class_name}</p>
                    </div>
                  </div>
                  
                  <div className="detail-group">
                    <label>E-mail</label>
                    <p>{selectedStudent.email}</p>
                  </div>
                  
                  <div className="detail-group">
                    <label>Telefone</label>
                    <p>{selectedStudent.phone}</p>
                  </div>
                  
                  <div className="detail-group">
                    <label>Endereço</label>
                    <p>{selectedStudent.address || 'Não informado'}</p>
                  </div>
                </div>
                <div className="action-buttons">
                  <button className="edit-action-btn" onClick={handleEditClick}>
                    Editar Aluno
                  </button>
                  <button className="delete-action-btn" onClick={() => setIsDeleteModalOpen(true)}>
                    Remover Aluno
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>

        <Modal
          isOpen={isAddModalOpen}
          onClose={() => { if (!isSubmitting) { setIsAddModalOpen(false); resetForm(); setError(null); } }}
          title="Adicionar Novo Aluno"
          footer={
            <>
              <Button variant="outline" onClick={() => { setIsAddModalOpen(false); resetForm(); }} disabled={isSubmitting}>Cancelar</Button>
              <Button variant="secondary" onClick={handleAdd} isLoading={isSubmitting} disabled={!formData.class_id}>Salvar</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
              <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '0.375rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}
            <Input label="Nome" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nome completo" disabled={isSubmitting} />
            <Input label="E-mail" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="email@exemplo.com" disabled={isSubmitting} />
            <Input label="Telefone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(00) 00000-0000" disabled={isSubmitting} />
            <Input label="Endereço" name="address" value={formData.address} onChange={handleInputChange} placeholder="Rua, Número, Bairro" disabled={isSubmitting} />
            <div className="input-container">
              <label className="input-label">Turma</label>
              <select name="class_id" value={formData.class_id} onChange={handleInputChange} className="input-field" disabled={isSubmitting}>
                <option value="">Selecione uma turma</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <Input label="Foto" type="file" onChange={handleFileChange} accept="image/*" disabled={isSubmitting} />
          </div>
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => { if (!isSubmitting) { setIsEditModalOpen(false); resetForm(); setError(null); } }}
          title="Editar Aluno"
          footer={
            <>
              <Button variant="outline" onClick={() => { setIsEditModalOpen(false); resetForm(); }} disabled={isSubmitting}>Cancelar</Button>
              <Button variant="secondary" onClick={handleUpdate} isLoading={isSubmitting} disabled={!formData.class_id}>Atualizar</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
              <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '0.375rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}
            <Input label="Nome" name="name" value={formData.name} onChange={handleInputChange} disabled={isSubmitting} />
            <Input label="E-mail" name="email" type="email" value={formData.email} onChange={handleInputChange} disabled={isSubmitting} />
            <Input label="Telefone" name="phone" value={formData.phone} onChange={handleInputChange} disabled={isSubmitting} />
            <Input label="Endereço" name="address" value={formData.address} onChange={handleInputChange} disabled={isSubmitting} />
            <div className="input-container">
              <label className="input-label">Turma</label>
              <select name="class_id" value={formData.class_id} onChange={handleInputChange} className="input-field" disabled={isSubmitting}>
                <option value="">Selecione uma turma</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <Input label="Foto" type="file" onChange={handleFileChange} accept="image/*" disabled={isSubmitting} />
          </div>
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => { if (!isSubmitting) setIsDeleteModalOpen(false); }}
          title="Confirmar Exclusão"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} disabled={isSubmitting}>Cancelar</Button>
              <Button variant="danger" onClick={handleDelete} isLoading={isSubmitting}>Excluir</Button>
            </>
          }
        >
          <p>Tem certeza que deseja remover o aluno <strong>{selectedStudent?.name}</strong>? Esta ação não pode ser desfeita.</p>
        </Modal>

        <Modal
          isOpen={isNoClassesModalOpen}
          onClose={() => setIsNoClassesModalOpen(false)}
          title="Nenhuma Turma Encontrada"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsNoClassesModalOpen(false)}>Cancelar</Button>
              <Button variant="secondary" onClick={() => navigate('/classes')}>Criar Turma</Button>
            </>
          }
        >
          <p>Você não pode cadastrar um aluno sem antes ter uma turma definida.</p>
          <p>Deseja ser redirecionado para a tela de criação de turmas agora?</p>
        </Modal>
      </main>
    </div>
  );
}
