import { FC } from "react";
import { User } from "../../../utils/types/user";
import ResetPasswordForm from "../ResetPasswordForm";
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
      <div className="pb-6 border-b border-slate-300">
        <UserForm user={user} />
      </div>
      <ResetPasswordForm userId={user.id} />
    </GenericModal>
  );
};

export default EditUserModal;
