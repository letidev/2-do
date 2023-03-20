import moment from "moment";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../utils/constants";
import { UserGuard } from "../../../utils/guards";
import { getMyTodos } from "../../../utils/http-utils/todo-requests";
import { getLoggedUser, logout } from "../../../utils/http-utils/user-requests";
import { ToDo } from "../../../utils/types/todo";
import IconButton from "../../common/inputs/IconButton";
import ToDoDisplay from "../../common/ToDoDisplay";
import ToDoForm from "../../common/ToDoForm";
import BasicLayout from "../../layout/BasicLayout";

const Home: FC = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const user = getLoggedUser();
  const navigate = useNavigate();

  useEffect(() => {
    getMyTodos().then((t) => setTodos(t));
  }, []);

  const refreshTodos = useCallback(() => {
    getMyTodos().then((t) => setTodos(t));
  }, []);

  return (
    <UserGuard>
      <BasicLayout className="max-w-[500px] w-full px-5 md:max-w-[640px]">
        <div className="flex flex-row justify-end w-full mb-10 gap-x-5">
          <IconButton
            onClick={() => {
              logout();
              navigate(PATHS.Login);
            }}
            icon="logout"
            title="Logout"
          />
        </div>
        <div className="mb-2 text-3xl">
          Hi {user?.firstName}, what would you like 2 do?
        </div>

        <ToDoForm refresh={refreshTodos} action="create" />

        <div className="mt-10 mb-2 text-2xl">Ongoing</div>

        <div className="grid grid-flow-row grid-cols-1 gap-y-5">
          {todos
            ?.filter((todo) => todo.status === "ongoing")
            .sort((a, b) => moment(a.dueDate).diff(b.dueDate))
            .map((todo) => (
              <ToDoDisplay todo={todo} key={todo.id} refresh={refreshTodos} />
            ))}
        </div>

        <div className="mt-10 mb-2 text-2xl">Done</div>

        <div className="grid grid-flow-row grid-cols-1 gap-y-5">
          {todos
            ?.filter((todo) => todo.status === "done")
            .sort((a, b) => moment(b.dueDate).diff(a.dueDate))
            .map((todo) => (
              <ToDoDisplay todo={todo} key={todo.id} refresh={refreshTodos} />
            ))}
        </div>
      </BasicLayout>
    </UserGuard>
  );
};

export default Home;
