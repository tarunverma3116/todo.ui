import api from "api/axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

interface ILogin {
  email: string;
  password: string;
}

const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation(
    async ({ email, password }: ILogin) => {
      const loginResponse = await api.post("/users/login", {
        email,
        password,
      });
      const { accessToken } = loginResponse.data.data;

      if (!accessToken) {
        throw new Error("Login failed");
      }
      return loginResponse.data.data;
    },
    {
      onSuccess: (loginResponse) => {
        localStorage.setItem("access_token", loginResponse.accessToken);
        navigate("/home");
      },
    }
  );
};

export default useLoginMutation;
