
export const initialState: IState = {
  first_name: "",
  last_name: "",
  email: "",
  linkedin_username: "",
  keywords: [],
  job_company_name: "",
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
  job_company_name: string;
  job_company_website: string
  countries: { code: string, name: string }[]
  phone: string
}