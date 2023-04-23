import api from "api/axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

interface IAddTask {
  title: string;
  description: string;
}

const useAddTaskMutation = () => {
  const navigate = useNavigate();

  return useMutation(
    async ({ title, description }: IAddTask) => {
      const response = await api.post("/tasks/", {
        title,
        description,
      });
      return response;
    },
    {
      onSuccess: (response) => {
        navigate("/home");
      },
    }
  );
};

export default useAddTaskMutation;
