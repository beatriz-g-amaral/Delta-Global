import { useState } from 'react';
import { Sidebar } from '../components/ui/Sidebar';
import { ClassCard } from '../components/Classes/Card';
import { useClasses } from '../hooks/use-classes';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import './CommonLayout.css';
import { Classes as ClassesType } from '../types/Classes';
import { Input } from '../components/ui/Input';
import { TeachersCall } from '../services/client/Teachers';
import { Teacher } from '../types/Teachers';
import { useEffect } from 'react';

export default function ClassesPage() {
  const { classes, error, setError, removeClass, addClass, updateClass, fetchClassesWithFilters } = useClasses();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    teacher_id: '',
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      const token = localStorage.getItem('token') || '';
      const response = await TeachersCall.list({ token });
      if (response.success && response.data?.result) {
        const result = response.data.result;
        setTeachers(Array.isArray(result) ? result : [result]);
      }
    };
    void fetchTeachers();
  }, []);

  const handleSelectClass = (id: number) => {
    setSelectedClassId(prevId => (prevId === id ? null : id));
  };

  const handleDelete = async () => {
    if (selectedClassId) {
      setIsSubmitting(true);
      try {
        await removeClass(selectedClassId);
        setSelectedClassId(null);
        setIsDeleteModalOpen(false);
        await fetchClassesWithFilters({});
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const selectedClass = classes.find(s => s.id === selectedClassId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      teacher_id: '',
    });
  };

  const handleAdd = async () => {
    setIsSubmitting(true);
    try {
      await addClass({
        name: formData.name,
        teacher_id: Number(formData.teacher_id),
      });
      setIsAddModalOpen(false);
      resetForm();
      await fetchClassesWithFilters({});
    } catch (err) {
      console.error("Error adding class:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = () => {
    if (selectedClass) {
      setFormData({
        name: selectedClass.name,
        teacher_id: String(selectedClass.teacher_id),
      });
      setIsEditModalOpen(true);
    }
  };

  const handleUpdate = async () => {
    if (selectedClassId && selectedClass) {
      setIsSubmitting(true);
      try {
        await updateClass({
          id: selectedClassId,
          name: formData.name,
          teacher_id: Number(formData.teacher_id),
        });
        setIsEditModalOpen(false);
        resetForm();
        await fetchClassesWithFilters({});
      } catch (err) {
        console.error("Error updating class:", err);
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
            <h1 className="page-title">Turmas</h1>
            <p className="page-subtitle">Gerencie as turmas do sistema</p>
          </div>
        </header>

        <div className="page-layout">
          <section className="page-content">
            <div className="section-header">
              <h2 className="section-title">Todos as turmas</h2>
              <div className="section-actions">
                <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>Adicionar turma</button>
              </div>
            </div>
            <div className="items-grid">
              {classes.map((classItem: ClassesType) => (
                <div
                  key={classItem.id}
                  className={`item-wrapper ${selectedClassId === classItem.id ? 'selected' : ''}`}
                  onClick={() => handleSelectClass(classItem.id)}
                >
                  <ClassCard
                    name={classItem.name}
                    teacher_name={classItem.teacher_name ?? ''}
                  />
                </div>
              ))}
            </div>
          </section>

          {selectedClass && (
            <aside className="actions-panel">
              <div className="panel-header">
                <h3>Ações</h3>
                <button className="close-panel" onClick={() => setSelectedClassId(null)}>×</button>
              </div>
              <div className="panel-content">
                <div className="selected-info">
                  <p className="selected-label">Selecionado:</p>
                  <p className="selected-name">{selectedClass.name}</p>
                </div>
                <div className="action-buttons">
                  <button className="edit-action-btn" onClick={handleEditClick}>
                    Editar turma
                  </button>
                  <button className="delete-action-btn" onClick={() => setIsDeleteModalOpen(true)}>
                    Remover turma
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>

        <Modal
          isOpen={isAddModalOpen}
          onClose={() => { if (!isSubmitting) { setIsAddModalOpen(false); resetForm(); setError(null); } }}
          title="Adicionar Nova Turma"
          footer={
            <>
              <Button variant="outline" onClick={() => { setIsAddModalOpen(false); resetForm(); }} disabled={isSubmitting}>Cancelar</Button>
              <Button variant="secondary" onClick={handleAdd} isLoading={isSubmitting}>Salvar</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
              <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '0.375rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}
            <Input label="Nome da Turma" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ex: 1º Ano A" disabled={isSubmitting} />
            <div className="input-container">
              <label className="input-label">Professor</label>
              <select name="teacher_id" value={formData.teacher_id} onChange={handleInputChange} className="input-field" disabled={isSubmitting}>
                <option value="">Selecione um professor</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => { if (!isSubmitting) { setIsEditModalOpen(false); resetForm(); setError(null); } }}
          title="Editar Turma"
          footer={
            <>
              <Button variant="outline" onClick={() => { setIsEditModalOpen(false); resetForm(); }} disabled={isSubmitting}>Cancelar</Button>
              <Button variant="secondary" onClick={handleUpdate} isLoading={isSubmitting}>Atualizar</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
              <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '0.375rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}
            <Input label="Nome da Turma" name="name" value={formData.name} onChange={handleInputChange} disabled={isSubmitting} />
            <div className="input-container">
              <label className="input-label">Professor</label>
              <select name="teacher_id" value={formData.teacher_id} onChange={handleInputChange} className="input-field" disabled={isSubmitting}>
                <option value="">Selecione um professor</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
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
          <p>Tem certeza que deseja remover a turma <strong>{selectedClass?.name}</strong>? Esta ação não pode ser desfeita.</p>
        </Modal>
      </main>
    </div>
  );
}
