import HeaderText from "components/header/HeaderText";
import { useForm } from "react-hook-form";
import FormTextInput from "components/input/FormTextInput";
import PrimaryButton, { SecondaryButton } from "components/button/Button";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useSpinner } from "context/Spinner";
import { Key, useEffect, useState } from "react";
import api from "api/axios";
import { toast } from "react-toastify";
import { useCompleteTask } from "hooks/queries/useCompleteTask";
import useFetchTask from "hooks/queries/useFetchTask";
import { useFetchSubTasks } from "hooks/queries/useFetchSubTasks";
import SubTaskCard from "components/cards/SubTaskCard";

type Props = {};

type Inputs = {
  title: string;
  description: string;
};

const Task = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { id } = useParams();
  const spinner = useSpinner();
  const [task, setTask] = useState<any>(null);
  const [subTasks, setSubTasks] = useState<any>(null);
  const [change, setChange] = useState(true);
  const navigate = useNavigate();
  const [subTaskTitle, setSubTaskTitle] = useState<any>(null);

  const FetchTask = async (id: any) => {
    spinner.setLoadingState(true);
    const response = await useFetchTask(id);
    setTask(response.data);
    spinner.setLoadingState(false);
  };

  const FetchSubTasks = async (id: any) => {
    spinner.setLoadingState(true);
    const response = await useFetchSubTasks(id);
    setSubTasks(response.data);
    spinner.setLoadingState(false);
  };

  const HandleDelete = async () => {
    try {
      spinner.setLoadingState(true);
      const response = await api.delete(`/tasks/delete/${id}`);
      spinner.setLoadingState(false);
      navigate("/tasks");
      toast.success(response.data.message);
    } catch (e) {
      spinner.setLoadingState(false);
      return e;
    }
  };

  const HandleComplete = async (id: any) => {
    spinner.setLoadingState(true);
    const response = await useCompleteTask(id);
    spinner.setLoadingState(false);
    toast.success(response.data.message);
    FetchTask(id);
  };

  useEffect(() => {
    FetchTask(id);
    FetchSubTasks(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    FetchTask(id);
    FetchSubTasks(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    FetchSubTasks(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change]);

  const onSubmit = (data: Inputs) => {
    spinner.setLoadingState(true);
    api
      .put(`/tasks/update/${id}`, data)
      .then((response) => {
        spinner.setLoadingState(false);
        toast.success(response.data.message);
        FetchTask(id);
      })
      .catch((e) => {
        spinner.setLoadingState(false);
        toast.error(e.response.data.message);
      });
  };

  const HandleCreateSubTask = async () => {
    spinner.setLoadingState(true);
    if (!subTaskTitle) {
    } else {
      await api
        .post(`/subtasks/${id}`, { title: subTaskTitle })
        .then((response) => {
          spinner.setLoadingState(false);
          toast.success(response.data.message);
          setSubTaskTitle("");
          setChange(!change);
          FetchSubTasks(id);
        })
        .catch((e) => {
          spinner.setLoadingState(false);
          toast.error(e.response.data.message);
        });
    }
    spinner.setLoadingState(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 mx-auto">
      <HeaderText />
      {task && (
        <div className="flex lg:flex-row flex-col gap-6">
          <div className="basis-1/2 flex lg:flex-row flex-col">
            <div className="basis-1/3 flex flex-col items-center">
              <label className="text-sm text-white font-bold mb-1">
                FINISH
              </label>
              {task.status === "completed" ? (
                <p className="rounded-full text-6xl text-green-500">
                  <AiFillCheckCircle />
                </p>
              ) : (
                <button
                  onClick={() => HandleComplete(task.id)}
                  className="rounded-full text-6xl text-grey-500 hover:text-green-500"
                >
                  <AiFillCheckCircle />
                </button>
              )}
            </div>
            <div className="form-container basis-2/3">
              <form onSubmit={handleSubmit(onSubmit)} className="">
                {/* {loginMutation?.error instanceof Error && <p>{loginMutation?.error?.response?.data?.message!}</p>} */}
                <div className="mb-6">
                  <FormTextInput
                    label="Title"
                    className=""
                    defaultValue={task.title}
                    register={() => register("title", { required: true })}
                    error={errors.title && "Title Required"}
                  />
                </div>
                <div className="mb-6">
                  <FormTextInput
                    label="Description"
                    type="textarea"
                    defaultValue={task.description}
                    register={() => register("description", { required: true })}
                    error={errors.description && "Description Required"}
                  />
                </div>
                <PrimaryButton
                  type="submit"
                  className="disabled:bg-opacity-70 w-full mb-3"
                >
                  Update
                </PrimaryButton>
                <SecondaryButton
                  type="button"
                  className="disabled:bg-opacity-70 w-full"
                  onClick={HandleDelete}
                >
                  Delete
                </SecondaryButton>
              </form>
            </div>
          </div>
          <div className="basis-1/2 flex flex-col gap-2">
            {subTasks != null && (
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white font-bold">SUBTASKS</label>
                <div className="flex flex-col gap-2">
                  {subTasks.map((task: any, key: Key | null | undefined) => {
                    return (
                      <SubTaskCard
                        key={key}
                        task={task}
                        change={change}
                        setChange={setChange}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            <label className="text-sm text-white font-bold mt-2">
              ADD SUBTASKS
            </label>
            <div className="mb-6">
              <input
                placeholder="Enter Title"
                required={true}
                value={subTaskTitle}
                className="input w-full mx-auto rounded text-black border-2 p-3 focus:outline-none bg-white"
                onChange={(e) => setSubTaskTitle(e.target.value)}
              />
            </div>
            <PrimaryButton
              onClick={HandleCreateSubTask}
              className="disabled:bg-opacity-70 w-full mb-3"
            >
              ADD SUBTASK
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
