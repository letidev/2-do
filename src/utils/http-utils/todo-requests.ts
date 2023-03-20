import axios from "axios";
import { ToDo } from "../types/todo";
import { getLoggedUser } from "./user-requests";

const apiUrl = "http://localhost:3005/todos";

export const createToDo = async (title: string, dueDate: string) => {
  const user = getLoggedUser();

  if (user) {
    const todo: ToDo = {
      title: title,
      dueDate: dueDate,
      status: "ongoing",
      userId: user.id,
    };

    return axios.post<ToDo>(apiUrl, todo).then((res) => res.data);
  }
};

export const editTodo = async (todo: ToDo) => {
  return axios.put<ToDo>(`${apiUrl}/${todo.id}`, todo).then((res) => res.data);
};

export const deleteTodo = async (id?: number) => {
  return axios.delete<ToDo>(`${apiUrl}/${id}`).then((res) => res.data);
};

export const getMyTodos = async () => {
  const user = getLoggedUser();

  return axios
    .get<ToDo[]>(`${apiUrl}?userId=${user?.id}`)
    .then((res) => res.data);
};
