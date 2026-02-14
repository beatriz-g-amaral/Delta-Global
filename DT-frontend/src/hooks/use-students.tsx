import { StudentsCall } from "../services/client/Students"

import { useEffect, useState, useCallback } from "react";
import { Student } from "../types/Students";

export function useStudents() {
    const [students, setStudents] = useState<Student[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchStudents = useCallback(async (filters?: Record<string, string | number | boolean | undefined>) => {
        const token = localStorage.getItem("token") || "";
        const response = await StudentsCall.list({ token, ...filters });
        
        if (response.success && response.data?.result) {
            const result = response.data.result;
            setStudents(Array.isArray(result) ? result : [result]);
        } else {
            setError(response.error || "Erro ao carregar alunos");
            console.error("Failed to fetch students:", response.error);
        }
    }, []);

    const removeStudent = async (id: number) => {
        const token = localStorage.getItem("token") || "";
        const response = await StudentsCall.delete({ token, id });

        if (response.success) {
            setStudents((prev) => prev.filter((student) => student.id !== id));
        } else {
            setError(response.error || "Erro ao remover aluno");
            console.error("Failed to remove student:", response.error);
        }
    };

    const addStudent = async (studentData: Omit<Student, "id"> & { pictureFile?: File | undefined }) => {
        setError(null);
        const token = localStorage.getItem("token") || "";
        const response = await StudentsCall.create({
            token,
            name: studentData.name,
            email: studentData.email,
            phone: studentData.phone,
            address: studentData.address || "",
            class_id: studentData.class_id,
            pictureFile: studentData.pictureFile,
        });

        if (response.success && response.data?.result) {
            const result = response.data.result;
            const newStudent = Array.isArray(result) ? result[0] : result;
            if (newStudent) {
                setStudents((prev) => [...prev, newStudent]);
            }
        } else {
            setError(response.error || "Erro ao adicionar aluno");
            console.error("Failed to add student:", response.error);
            throw new Error(response.error || "Erro ao adicionar aluno");
        }
    };

    useEffect(() => {
        const load = async () => {
            await fetchStudents();
        };
        void load();
    }, [fetchStudents]);

    const fetchStudentsWithFilters = async (filters: Record<string, string | number | boolean | undefined>) => {
        await fetchStudents(filters);
    };

    const updateStudent = async (studentData: Student & { pictureFile?: File | undefined }) => {
        setError(null);
        const token = localStorage.getItem("token") || "";
        const response = await StudentsCall.update({
            token,
            id: studentData.id,
            name: studentData.name,
            email: studentData.email,
            phone: studentData.phone,
            address: studentData.address || "",
            class_id: studentData.class_id,
            pictureFile: studentData.pictureFile,
        });

        if (response.success && response.data?.result) {
            const result = response.data.result;
            const updatedStudent = Array.isArray(result) ? result[0] : result;
            if (updatedStudent) {
                setStudents((prev) => prev.map((s) => s.id === updatedStudent.id ? updatedStudent : s));
            }
        } else {
            setError(response.error || "Erro ao atualizar aluno");
            console.error("Failed to update student:", response.error);
            throw new Error(response.error || "Erro ao atualizar aluno");
        }
    };

    return {
        students,
        error,
        setError,
        fetchStudentsWithFilters,
        removeStudent,
        addStudent,
        updateStudent,
    };
}