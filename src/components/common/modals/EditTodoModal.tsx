import React, { FC } from "react";
import { ToDo } from "../../../utils/types/todo";
import ToDoForm from "../ToDoForm";
import GenericModal from "./GenericModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
  todo: ToDo;
}

const EditTodoModal: FC<Props> = ({ isOpen, onClose, todo, refresh }) => {
  return (
    <GenericModal isOpen={isOpen} onClose={onClose} className="max-w-lg">
      <ToDoForm
        refresh={() => {
          refresh();
          onClose();
        }}
        todo={todo}
        action="edit"
      />
    </GenericModal>
  );
};

export default EditTodoModal;
