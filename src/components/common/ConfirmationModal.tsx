import { Dialog } from "@headlessui/react";
import React, { FC } from "react";
import Button from "./inputs/Button";
import OutlineButton from "./inputs/OutlineButton";

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
    <Dialog open={isOpen} onClose={onClose}>
      {/* backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-5">
        <Dialog.Panel className="max-w-sm p-5 mx-auto bg-white rounded-xl">
          <Dialog.Title className="mb-4 text-xl font-medium">
            {title}
          </Dialog.Title>

          <p className="text-sm text-gray-500">{text}</p>

          <div className="flex flex-col mt-5 gap-y-2 sm:flex-row sm:gap-x-2">
            <OutlineButton onClick={onClose} text="Cancel" />
            <Button onClick={onConfirm} text="Delete" />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmationModal;
