import { ifError } from "assert";

export const initialState: IState = {
  first_name: "",
  last_name: "",
  email: "",
  linkedin_username: "",
  keywords: [],
  job_company_names: [],
  job_company_website: "",
  countries: [],
  phone: "",
}

export interface Keyword {
  id: string;
  text: string;
}

export interface IState {
  first_name: string;
  last_name: string;
  email: string;
  linkedin_username: string;
  keywords: Keyword[];
  job_company_names: string[];
  job_company_website: string
  countries: string[]
  phone: string
}

export type Error = { status: number, text: string } | null