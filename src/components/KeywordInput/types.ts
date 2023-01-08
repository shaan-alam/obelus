import { IState } from "../../pages/Home/types";


export interface IProps {
  keywords: string[];
  setState: React.Dispatch<React.SetStateAction<IState>>
}