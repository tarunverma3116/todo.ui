import api from "api/axios";

export const useUpdateTask = async (id: string, data: any) => {
  try {
    const response = await api.put(`/tasks/update/${id}`, data);
    return response.data;
  } catch (e) {
    return e;
  }
};

// Path: src/hooks/queries/useUpdateTask.tsx
