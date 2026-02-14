import { StudentsCall } from "../services/client/Students"

export async function useDashboard() {
    const getLastStudents = async () => {
        const token = localStorage.getItem("token") || "";
        const response = await StudentsCall.list({ token });
        if (response.success) {
            return response.data?.result
        } else {
            console.error("Failed to fetch students:", response.error);
            return [];
        }
    };

    return {
        getLastStudents,
    };
}   