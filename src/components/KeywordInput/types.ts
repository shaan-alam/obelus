import { IState } from "../../pages/Home/types";

export interface Keyword {
  id: string;
  text: string;
}

export interface IProps {
  keywords: Keyword[];
  setState: React.Dispatch<React.SetStateAction<IState>>
}