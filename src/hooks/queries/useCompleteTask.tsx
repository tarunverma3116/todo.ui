import api from "api/axios";

export const useCompleteTask = async (id: string) => {
  try {
    const response = await api.put(`/tasks/complete/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
