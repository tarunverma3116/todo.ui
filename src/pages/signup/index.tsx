import HeaderText from "components/header/HeaderText";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import FormTextInput from "components/input/FormTextInput";
import PrimaryButton from "components/button/Button";
import useSignupMutation from "hooks/mutations/useSignupMutation";
import { toast } from "react-toastify";
import { useSpinner } from "context/Spinner";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

interface Props {}

const Signup = (props: Props) => {
  const navigate = useNavigate();
  const signupMutation = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const spinner = useSpinner();

  const onSubmit = (data: Inputs) => {
    spinner.setLoadingState(true);
    signupMutation.mutate(data);
    spinner.setLoadingState(false);
  };

  if (signupMutation.isSuccess) {
    toast.success("Signup Successful");
    navigate("/login");
  }

  if (signupMutation.error) {
    const error = signupMutation.error as any;
    if (error.message === "Network Error") {
      toast.error(error.message);
    } else {
      toast.error(error.response.data.message);
    }
    signupMutation.reset();
  }

  useEffect(() => {
    const item = localStorage.getItem("access_token");
    if (item) {
      navigate("/home");
    } else {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderText />
      <div className="form-container lg:w-[50%] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <p className="font-semibold text-3xl mb-6 mt-5 text-center">
            Create an account
          </p>
          <div className="mb-6">
            <FormTextInput
              label="Name"
              className=""
              type="text"
              register={() => register("name", { required: true })}
              error={errors.name && "Name Required"}
            />
          </div>
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
            disabled={signupMutation.isLoading}
            className="disabled:bg-opacity-70 w-full mb-6"
          >
            {signupMutation.isLoading ? "Signing Up" : "Sign Up"}
          </PrimaryButton>
          <Link to="/login" className="hover:underline">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
