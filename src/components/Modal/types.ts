export interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
}