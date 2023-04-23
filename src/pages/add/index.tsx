import HeaderText from "components/header/HeaderText";
import { useForm } from "react-hook-form";
import FormTextInput from "components/input/FormTextInput";
import PrimaryButton from "components/button/Button";
import useAddTaskMutation from "hooks/mutations/useAddTaskMutation";
import { useSpinner } from "context/Spinner";

type Props = {};

type Inputs = {
  title: string;
  description: string;
};

const Add = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const addTaskMutation = useAddTaskMutation();
  const spinner = useSpinner();

  const onSubmit = (data: Inputs) => {
    spinner.setLoadingState(true);
    try {
      addTaskMutation.mutate(data);
    } catch (e) {
      console.log(e);
    }
    spinner.setLoadingState(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 lg:w-1/2 mx-auto">
      <HeaderText />
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="mb-6">
            <FormTextInput
              label="Title"
              className=""
              register={() => register("title", { required: true })}
              error={errors.title && "Title Required"}
            />
          </div>
          <div className="mb-6">
            <FormTextInput
              label="Description"
              type="textarea"
              register={() => register("description", { required: true })}
              error={errors.description && "Description Required"}
            />
          </div>
          <PrimaryButton
            type="submit"
            className="disabled:bg-opacity-70 w-full mb-3"
          >
            Add
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default Add;
