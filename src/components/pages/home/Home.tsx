import { FC } from "react";
import { UserGuard } from "../../../utils/guards";
import { ToDo } from "../../../utils/types/ToDo";
import ToDoDisplay from "../../common/ToDoDisplay";
import ToDoForm from "../../common/ToDoForm";
import BasicLayout from "../../layout/BasicLayout";

const todo: ToDo = {
  id: "1",
  title: "Finish my course project",
  dueDate: new Date(),
  status: "ongoing",
  userId: "1",
};

const Home: FC = () => {
  return (
    <UserGuard>
      <BasicLayout className="max-w-[500px] w-full px-5 md:max-w-[640px]">
        <div className="mb-2 text-3xl">What would you like 2 do?</div>

        <ToDoForm />

        <div className="mt-10 mb-2 text-2xl">Ongoing</div>

        <div className="grid grid-flow-row grid-cols-1">
          <ToDoDisplay todo={todo} />
        </div>
      </BasicLayout>
    </UserGuard>
  );
};

export default Home;
