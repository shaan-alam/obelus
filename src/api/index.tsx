import axios from "axios";
import type { APIResponse, Lead } from "../types";
import type { Keyword } from "../pages/Home/types";
import type { BarkLead } from "../pages/Bark/types";

interface IParameters {
  first_name: string;
  last_name: string;
  email: string;
  linkedin_username: string;
  keywords: Keyword[];
  job_company_name: string;
  job_company_website: string;
}

export const api = axios.create({
  baseURL: "https://project-x-ney5.onrender.com/",
});

export const getSearchResults = (parameters: IParameters) =>
  api.post<APIResponse>("/search", { ...parameters });

export const getSingleLead = (id: string) => api.get<Lead>(`/search/${id}`);

export const getBarkData = () => api.get<BarkLead[]>("/leads");

export const getSingleBarkData = (project_id: string) =>
  api.get<BarkLead>(`/leads/${project_id}`);
