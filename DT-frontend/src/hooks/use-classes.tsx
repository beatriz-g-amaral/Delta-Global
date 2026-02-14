import { ClassesCall } from "../services/client/Classes"

import { useEffect, useState, useCallback } from "react";
import { Classes } from "../types/Classes";

export function useClasses() {
    const [classes, setClasses] = useState<Classes[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchClasses = useCallback(async (filters?: Record<string, string | number | boolean | undefined>) => {
        const token = localStorage.getItem("token") || "";
        const response = await ClassesCall.list({ token, ...filters });
        
        if (response.success && response.data?.result) {
            const result = response.data.result;
            setClasses(Array.isArray(result) ? result : [result]);
        } else {
            setError(response.error || "Erro ao carregar turmas");
            console.error("Failed to fetch classes:", response.error);
        }
    }, []);

    const removeClass = async (id: number) => {
        const token = localStorage.getItem("token") || "";
        const response = await ClassesCall.delete({ token, id });

        if (response.success) {
            setClasses((prev) => prev.filter((classItem) => classItem.id !== id));
        } else {
            setError(response.error || "Erro ao remover turma");
            console.error("Failed to remove class:", response.error);
        }
    };

    const addClass = async (classData: Pick<Classes, "name" | "teacher_id">) => {
        setError(null);
        const token = localStorage.getItem("token") || "";
        const response = await ClassesCall.create({
            token,
            ...classData,
        });

        if (response.success && response.data?.result) {
            const result = response.data.result;
            const newClass = Array.isArray(result) ? result[0] : result;
            if (newClass) {
                setClasses((prev) => [...prev, newClass]);
            }
        } else {
            setError(response.error || "Erro ao adicionar turma");
            console.error("Failed to add class:", response.error);
            throw new Error(response.error || "Erro ao adicionar turma");
        }
    };

    useEffect(() => {
        const load = async () => {
            await fetchClasses();
        };
        void load();
    }, [fetchClasses]);

    const fetchClassesWithFilters = async (filters: Record<string, string | number | boolean | undefined>) => {
        await fetchClasses(filters);
    };

    const updateClass = async (classData: Pick<Classes, "id" | "name" | "teacher_id">) => {
        const token = localStorage.getItem("token") || "";
        const response = await ClassesCall.update({
            token,
            ...classData,
        });

        if (response.success && response.data?.result) {
            const result = response.data.result;
            const updatedClass = Array.isArray(result) ? result[0] : result;
            if (updatedClass) {
                setClasses((prev) => prev.map((c) => c.id === updatedClass.id ? updatedClass : c));
            }
        } else {
            setError(response.error || "Erro ao atualizar turma");
            console.error("Failed to update class:", response.error);
            throw new Error(response.error || "Erro ao atualizar turma");
        }
    };

    return {
        classes,
        error,
        setError,
        fetchClassesWithFilters,
        removeClass,
        addClass,
        updateClass,
    };
}