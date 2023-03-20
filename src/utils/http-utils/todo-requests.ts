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
  } else {
    throw new Error("You must be logged in.");
  }
};

export const editTodo = async (todo: ToDo) => {
  const user = getLoggedUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  if (user.role !== "user") {
    throw new Error("Only users can edit todos.");
  }

  return axios.put<ToDo>(`${apiUrl}/${todo.id}`, todo).then((res) => res.data);
};

export const deleteTodo = async (todo: ToDo) => {
  const user = getLoggedUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  if (user.role !== "user") {
    throw new Error("Only users can delete todos.");
  }

  return axios.delete<ToDo>(`$P{apiUrl}/${todo.id}`).then((res) => res.data);
};

export const getMyTodos = async () => {
  const user = getLoggedUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  return axios
    .get<ToDo[]>(`${apiUrl}?userId=${user.id}`)
    .then((res) => res.data);
};
