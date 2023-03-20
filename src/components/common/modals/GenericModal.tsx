import { Dialog } from "@headlessui/react";
import React, { FC, PropsWithChildren } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const GenericModal: FC<PropsWithChildren<Props>> = ({
  isOpen,
  children,
  onClose,
  className,
}) => (
  <Dialog open={isOpen} onClose={onClose}>
    {/* backdrop */}
    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

    <div className="fixed inset-0 flex items-center justify-center p-5">
      <Dialog.Panel
        className={`p-5 mx-auto bg-white rounded-xl w-full ${className}`}
      >
        {children}
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default GenericModal;
