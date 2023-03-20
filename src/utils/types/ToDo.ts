export interface ToDo {
  id?: number;
  userId: string;
  title: string;
  dueDate: string;
  status: ToDoStatus;
}

export type ToDoStatus = "ongoing" | "done";
