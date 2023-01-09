import { IState } from "../../pages/Home/types";


export interface IProps {
  keywords: string[];
  onSelect: (value: string) => void
  onDelete: (value: string) => void
  placeholder: string
}