import { ClassesCall } from "../services/client/Classes"

import { useEffect, useState, useCallback } from "react";
import { Classes } from "../types/Classes";

export function useClasses() {
    const [classes, setClasses] = useState<Classes[]>([]);

    const fetchClasses = useCallback(async (filters?: Record<string, string | number | boolean | undefined>) => {
        const token = localStorage.getItem("token") || "";
        const response = await ClassesCall.list({ token, ...filters });
        
        if (response.success && response.data?.result) {
            const result = response.data.result;
            setClasses(Array.isArray(result) ? result : [result]);
        } else {
            console.error("Failed to fetch classes:", response.error);
        }
    }, []);

    const removeClass = async (id: number) => {
        const token = localStorage.getItem("token") || "";
        const response = await ClassesCall.delete({ token, id });

        if (response.success) {
            setClasses((prev) => prev.filter((classItem) => classItem.id !== id));
        } else {
            console.error("Failed to remove class:", response.error);
        }
    };

    const addClass = async (classData: Pick<Classes, "name" | "teacher_id">) => {
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
            console.error("Failed to add class:", response.error);
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
            console.error("Failed to update class:", response.error);
        }
    };

    return {
        classes,
        fetchClassesWithFilters,
        removeClass,
        addClass,
        updateClass,
    };
}