import HeaderText from "components/header/HeaderText";
import React from "react";
import useGetTasks from "hooks/queries/useGetTasks";
import SmallCard from "components/cards/SmallCard";
import PrimaryButton from "components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";

type Props = {};

const Home = (props: Props) => {
  const [tasks, setTasks] = React.useState<any[]>([]);

  const HandleFetchTasks = async () => {
    const response = await useGetTasks();
    setTasks(response.data.reverse());
  };

  React.useEffect(() => {
    HandleFetchTasks();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 justify-items-center lg:justify-items-end lg:grid-cols-3 gap-3 items-center">
        <div className="hidden lg:flex"></div>
        <HeaderText />
        <Link to="/profile">
          <BiUserCircle className="w-8 h-8" />
        </Link>
      </div>

      {tasks &&
        tasks.slice(0, 4).map((task, key) => {
          return <SmallCard key={key} task={task} />;
        })}
      {tasks && tasks.length === 0 ? (
        <div className="text-center text-2xl font-bold">No Tasks Found</div>
      ) : (
        <Link className="text-white hover:underline" to="/tasks">
          View All
        </Link>
      )}
      <PrimaryButton
        className="flex items-center gap-2 mx-auto"
        onClick={() => {
          navigate("/add-task");
        }}
      >
        Add Task
        <IoMdAdd />
      </PrimaryButton>
    </div>
  );
};

export default Home;
