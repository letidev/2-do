export interface ToDo {
  id: string;
  userId: string;
  title: string;
  dueDate: Date;
  status: "ongoing" | "done";
}

export type ToDoStatus = "ongoing" | "done";
