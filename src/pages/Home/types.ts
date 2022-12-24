
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
}