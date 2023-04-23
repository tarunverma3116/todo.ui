import api from "api/axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

interface ISignup {
  name: string;
  email: string;
  password: string;
}

const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation(
    async ({ name, email, password }: ISignup) => {
      const signupResponse = await api.post("/users/signup", {
        name,
        email,
        password,
      });
      return signupResponse.data.data;
    },
    {
      onSuccess: (signupResponse) => {
        navigate("/login");
      },
    }
  );
};

export default useSignupMutation;
