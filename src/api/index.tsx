import axios from "axios";
import type { APIResponse, Lead } from "../types";
import type { Keyword } from "../pages/Home/types";
import type { BarkLead } from "../pages/Bark/types";

interface IParameters {
  first_name: string;
  last_name: string;
  countries: { name: string; code: string }[];
  linkedin_username: string;
  job_company_name: string;
  job_company_website: string;
  email: string;
  phone: string;
  keywords: Keyword[];
  page_no: string;
}

export const api = axios.create({
  baseURL: "https://project-x-ney5.onrender.com/",
});

export const getSearchResults = (parameters: IParameters) => {
  console.log(parameters.page_no);
  return api.post<APIResponse>(
    `/search?page_number=${+parameters.page_no - 1}`,
    {
      ...parameters,
    }
  );
};

export const getSingleLead = (id: string) => api.get<Lead>(`/search/${id}`);

export const getBarkData = () => api.get<BarkLead[]>("/leads");

export const getSingleBarkData = (project_id: string) =>
  api.get<BarkLead>(`/leads/${project_id}`);
