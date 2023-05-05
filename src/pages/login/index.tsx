import HeaderText from "components/header/HeaderText";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import FormTextInput from "components/input/FormTextInput";
import PrimaryButton from "components/button/Button";
import useLoginMutation from "hooks/mutations/useLoginMutation";
import { toast } from "react-toastify";
import { HiLockClosed } from "react-icons/hi";

type Inputs = {
  email: string;
  password: string;
};

interface Props {}

const Login = (props: Props) => {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    loginMutation.mutate(data);
  };

  if (loginMutation.error) {
    const error = loginMutation.error as any;
    if (error.message === "Network Error") {
      toast.error(error.message);
    } else {
      toast.error(error.response.data.message);
    }
    loginMutation.reset();
  }

  useEffect(() => {
    const item = localStorage.getItem("access_token");
    if (item) {
      navigate("/home");
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderText />
      <div className="form-container lg:w-[50%] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <p className="font-semibold text-3xl mb-12 mt-5 text-center">
            Login to your account
          </p>
          <div className="mb-6">
            <FormTextInput
              label="Email"
              className=""
              register={() => register("email", { required: true })}
              error={errors.email && "Email Required"}
            />
          </div>
          <div className="mb-6">
            <FormTextInput
              label="Password"
              type="password"
              register={() => register("password", { required: true })}
              error={errors.password && "Password Required"}
            />
          </div>
          <PrimaryButton
            type="submit"
            disabled={loginMutation.isLoading}
            className="disabled:bg-opacity-70 w-full mb-6"
          >
            {loginMutation.isLoading ? "Signing In" : "Sign In"}
          </PrimaryButton>
          <Link to="/signup" className="hover:underline">
            Dont have an account? Signup
          </Link>
          <p className="text-red-500 flex flex-row items-center">
            Note : Please Allow Insecure Content from &nbsp;
            <span className="hidden lg:flex">
              <HiLockClosed />
            </span>{" "}
            &nbsp; Site Settings
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
