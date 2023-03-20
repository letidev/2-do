import { FC } from "react";
import { User } from "../../../utils/types/user";
import UserForm from "../UserForm";
import GenericModal from "./GenericModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const EditUserModal: FC<Props> = ({ isOpen, onClose, user }) => {
  return (
    <GenericModal isOpen={isOpen} onClose={onClose} className="max-w-lg">
      <UserForm user={user} />
    </GenericModal>
  );
};

export default EditUserModal;
