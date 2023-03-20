import axios from "axios";
import { ToDo } from "../types/todo";
import { getLoggedUserId } from "./user-requests";

const apiUrl = "http://localhost:3005/todos";

export const createToDo = async (title: string, dueDate: string) => {
  const userId = getLoggedUserId();

  if (userId) {
    const todo: ToDo = {
      title: title,
      dueDate: dueDate,
      status: "ongoing",
      userId: userId,
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
  const userId = getLoggedUserId();

  return axios
    .get<ToDo[]>(`${apiUrl}?userId=${userId}`)
    .then((res) => res.data);
};
