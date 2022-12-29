
export const initialState: IState = {
  first_name: "",
  last_name: "",
  email: "",
  linkedin_username: "",
  keywords: [],
  companies: [],
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
  companies: string[];
  job_company_website: string
  countries: string[]
  phone: string
}