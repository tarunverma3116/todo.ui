import api from "api/axios";

const useGetTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (e) {
    return undefined;
  }
};

export default useGetTasks;
