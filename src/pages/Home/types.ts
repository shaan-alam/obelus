export const initialState: IState = {
  first_name: "",
  last_name: "",
  emails: [],
  linkedin_usernames: [],
  keywords: [],
  job_company_names: [],
  job_company_website: "",
  countries: [],
  phone: "",
  schoolNames: [],
  education: []
}


export interface IState {
  first_name: string;
  last_name: string;
  emails: string[];
  linkedin_usernames: string[];
  keywords: string[];
  job_company_names: string[];
  job_company_website: string
  countries: string[]
  phone: string,
  schoolNames: string[],
  education: string[]
}

export type Error = { status: number, text: string } | null