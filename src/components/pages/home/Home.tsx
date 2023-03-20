import moment from "moment";
import { FC, useEffect, useState } from "react";
import { UserGuard } from "../../../utils/guards";
import { getMyTodos } from "../../../utils/http-utils/todo-requests";
import { ToDo } from "../../../utils/types/todo";
import ToDoDisplay from "../../common/ToDoDisplay";
import ToDoForm from "../../common/ToDoForm";
import BasicLayout from "../../layout/BasicLayout";

const Home: FC = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  useEffect(() => {
    getMyTodos().then((t) =>
      setTodos(t.sort((a, b) => moment(a.dueDate).diff(b.dueDate)))
    );
  }, []);

  const onSubmitCallback = () => {
    getMyTodos().then((t) =>
      setTodos(t.sort((a, b) => moment(a.dueDate).diff(b.dueDate)))
    );
  };

  return (
    <UserGuard>
      <BasicLayout className="max-w-[500px] w-full px-5 md:max-w-[640px]">
        <div className="mb-2 text-3xl">What would you like 2 do?</div>

        <ToDoForm onSubmitCallback={onSubmitCallback} />

        <div className="mt-10 mb-2 text-2xl">Ongoing</div>

        <div className="grid grid-flow-row grid-cols-1 gap-y-5">
          {todos?.map((todo) => (
            <ToDoDisplay todo={todo} key={todo.id} />
          ))}
        </div>
      </BasicLayout>
    </UserGuard>
  );
};

export default Home;
