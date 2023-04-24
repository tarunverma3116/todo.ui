import { useSpinner } from "context/Spinner";
import React from "react";
import useGetTasks from "hooks/queries/useGetTasks";
import LargeCard from "components/cards/LargeCard";
import HeaderText from "components/header/HeaderText";

type Props = {};

const AllTasks = (props: Props) => {
  const [tasks, setTasks] = React.useState<any[]>([]);
  const spinner = useSpinner();

  const HandleFetchTasks = async () => {
    spinner.setLoadingState(true);
    const response = await useGetTasks();
    setTasks(response.data.reverse());
    spinner.setLoadingState(false);
  };

  React.useEffect(() => {
    HandleFetchTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <HeaderText />
      {tasks && tasks.length === 0 ? (
        <div className="text-center text-2xl font-bold">No Tasks Found</div>
      ) : (
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
          {tasks &&
            tasks.map((task, key) => {
              return <LargeCard key={key} task={task} />;
            })}
        </div>
      )}
    </div>
  );
};

export default AllTasks;
