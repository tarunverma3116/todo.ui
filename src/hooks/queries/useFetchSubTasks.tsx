import api from "api/axios";

export const useFetchSubTasks = async (id: string) => {
  try {
    const response = await api.get(`/subtasks/all/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
