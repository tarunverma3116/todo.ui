import api from "api/axios";

const useFetchTask = async (id: string) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};

export default useFetchTask;
