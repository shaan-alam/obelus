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
  school_names: [],
  education_keywords: [],
  keywordsNotIncluded: [],
  salaryRange: {
    min: 0,
    max: 500001
  }
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
  school_names: string[],
  education_keywords: string[]
  keywordsNotIncluded: string[]
  salaryRange: {
    min: number,
    max: number
  };
}

export type Error = { status: number, text: string } | null