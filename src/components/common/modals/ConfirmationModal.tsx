import { Dialog } from "@headlessui/react";
import React, { FC } from "react";
import Button from "../inputs/Button";
import OutlineButton from "../inputs/OutlineButton";
import GenericModal from "./GenericModal";

interface Props {
  title: string;
  text: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: FC<Props> = ({
  title,
  text,
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-4 text-xl font-medium">{title}</div>

      <p className="text-sm text-gray-500">{text}</p>

      <div className="flex flex-col mt-5 gap-y-2 sm:flex-row sm:gap-x-2">
        <OutlineButton onClick={onClose} text="Cancel" />
        <Button onClick={onConfirm} text="Delete" />
      </div>
    </GenericModal>
  );
};

export default ConfirmationModal;
