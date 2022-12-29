import axios, { AxiosResponse, AxiosError } from "axios";
import type { APIResponse, Lead } from "../types";
import type { Keyword } from "../pages/Home/types";
import type { BarkLead } from "../pages/Bark/types";

interface IParameters {
  first_name: string;
  last_name: string;
  countries: string[];
  linkedin_username: string;
  companies: string[];
  job_company_website: string;
  email: string;
  phone: string;
  keywords: Keyword[];
  page_no: string;
}

export const api = axios.create({
  baseURL: "https://project-x-ney5.onrender.com/",
});

export const getSearchResults = async (parameters: IParameters) =>
  api.post(`/search?page_number=${+parameters.page_no - 1}`, {
    ...parameters,
  });

export const getSingleLead = (id: string) => api.get<Lead>(`/search/${id}`);

export const getBarkData = () => api.get<BarkLead[]>("/leads");

export const getSingleBarkData = (project_id: string) =>
  api.get<BarkLead>(`/leads/${project_id}`);

export const downloadResults = (data: Omit<IParameters, "page_no">) =>
  api.post("/download", {
    ...data,
  });
