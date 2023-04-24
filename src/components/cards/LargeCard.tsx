import PrimaryButton from "components/button/Button";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type Props = {
  task: any;
};

const LargeCard = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white w-full h-[250px] p-3 pb-6 rounded-lg">
      <div className="flex flex-col h-full gap-3 items-center justify-between">
        <div className="flex flex-col gap-2 w-full overflow-scroll">
          {props.task.status === "completed" ? (
            <p className="text-3xl text-green-500">
              <AiFillCheckCircle />
            </p>
          ) : (
            <p className="text-3xl">
              <AiFillCheckCircle />
            </p>
          )}
          <p className="text-sm font-bold text-black">{props.task.title}</p>
          <p className="text-xs text-black">{props.task.description}</p>
        </div>
        <PrimaryButton
          onClick={() => {
            navigate(`/task/${props.task.id}`);
          }}
        >
          View task
        </PrimaryButton>
      </div>
    </div>
  );
};

export default LargeCard;
