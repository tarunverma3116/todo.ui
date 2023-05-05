import { AiFillCheckCircle } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import api from "api/axios";
import { toast } from "react-toastify";
import { useSpinner } from "context/Spinner";

type Props = {
  task: any;
  change: any;
  setChange: any;
};

const SubTaskCard = (props: Props) => {
  const spinner = useSpinner();

  const HandleDelete = async (id: any) => {
    try {
      spinner.setLoadingState(true);
      const response = await api.delete(`/subtasks/delete/${id}`);
      props.setChange(!props.change);
      spinner.setLoadingState(false);
      toast.success(response.data.message);
    } catch (e) {
      spinner.setLoadingState(false);
      return e;
    }
  };

  const HandleComplete = async (id: any) => {
    spinner.setLoadingState(true);
    const response = await api.put(`/subtasks/complete/${id}`);
    props.setChange(!props.change);
    spinner.setLoadingState(false);
    toast.success(response.data.message);
  };

  return (
    <div className="bg-white w-full h-[50px] p-3 rounded-lg">
      <div className="flex flex-row h-full gap-2 items-center justify-between overflow-hidden">
        {props.task.status === "completed" ? (
          <p className="text-xl text-green-500">
            <AiFillCheckCircle />
          </p>
        ) : (
          <p className="text-xl">
            <AiFillCheckCircle />
          </p>
        )}
        <div className="flex flex-col gap-1 text-left basis-3/4 text-black">
          <p className="text-xs font-bold">{props.task.title}</p>
        </div>
        {props.task.status === "pending" && (
          <button
            className="text-2xl hover:text-green-500"
            onClick={() => HandleComplete(props.task.id)}
          >
            <AiFillCheckCircle />
          </button>
        )}
        <button
          className="text-2xl text-red-500"
          onClick={() => HandleDelete(props.task.id)}
        >
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
};

export default SubTaskCard;
