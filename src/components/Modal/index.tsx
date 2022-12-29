import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import type { ModalProps } from "./types";
import { HiX } from "react-icons/hi";

const Modal = ({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
}: ModalProps) => {
  return (
    <Transition
      show={isOpen}
      enter="transition duration-200 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-200 ease-out"
      leaveFrom="transform scale-800 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={React.Fragment}
    >
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        static={true}
        className="fixed inset-0 z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-20">
          <Dialog.Panel className="rounded-lg bg-white shadow-2xl w-[800px]">
            <Dialog.Title className="flex items-center justify-between bg-gray-50 font-semibold p-4 border-b rounded-tl-md rounded-tr-md text-center text-lg">
              <h1 className="ml-9">{title}</h1>
              <span
                className="text-gray-600 bg-gray-100 p-4 rounded-full hover:bg-gray-200 hover:text-gray-800 transition-colors cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <HiX size={20} />
              </span>
            </Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
            <div className="modal-content">{children}</div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
