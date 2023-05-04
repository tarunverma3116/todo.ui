import api from "api/axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "context/UserProvider";

interface ILogin {
  email: string;
  password: string;
}

const useLoginMutation = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

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
        setUser(loginResponse.user);
        navigate("/home");
      },
    }
  );
};

export default useLoginMutation;
