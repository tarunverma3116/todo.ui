import PrimaryButton from "components/button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";

type Props = {
  task: any;
};

const SmallCard = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white w-full h-[80px] p-3 rounded-lg">
      <div className="flex flex-row h-full gap-2 items-center justify-between">
        {props.task.status === "completed" ? (
          <p className="text-3xl text-green-500">
            <AiFillCheckCircle />
          </p>
        ) : (
          <p className="text-3xl">
            <AiFillCheckCircle />
          </p>
        )}
        <div className="flex flex-col gap-1 text-left basis-3/4 text-black">
          <div className="text-xl uppercase font-bold">{props.task.title}</div>
          <div className="text-xs">{props.task.description}</div>
        </div>
        <PrimaryButton
          onClick={() => {
            navigate(`/task/${props.task.id}`);
          }}
        >
          View
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SmallCard;
