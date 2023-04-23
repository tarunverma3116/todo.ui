import HeaderText from "components/header/HeaderText";
import React from "react";
import useGetTasks from "hooks/queries/useGetTasks";
import SmallCard from "components/cards/SmallCard";
import PrimaryButton, { SecondaryButton } from "components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { MdLogout } from "react-icons/md";

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
      <HeaderText />
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
      <SecondaryButton
        className="flex items-center gap-2 mx-auto"
        onClick={() => {
          localStorage.removeItem("access_token");
          navigate("/login");
        }}
      >
        Logout
        <MdLogout />
      </SecondaryButton>
    </div>
  );
};

export default Home;
