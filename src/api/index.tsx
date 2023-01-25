import axios from "axios";
import type { ILeadResponse, Lead } from "../types";
import type { IState } from "../pages/Home/types";
import type { BarkLead } from "../pages/Bark/types";

interface IParameters extends IState {
  page_no: string;
}

export const api = axios.create({
  baseURL: "https://obelus-dynamics-backend.onrender.com/",
});

export const getSearchResults = (parameters: IParameters) =>
  api.post<ILeadResponse>(`/search?page_number=${+parameters.page_no - 1}`, {
    ...parameters,
  });

export const getSingleLead = (id: string) => api.get<Lead['_source']>(`/search/${id}`);

export const getBarkData = () => api.get<BarkLead[]>("/leads");

export const getSingleBarkData = (project_id: string) =>
  api.get<BarkLead>(`/leads/${project_id}`);

export const downloadResults = (data: Omit<IParameters, "page_no">) =>
  api.post("/download", {
    ...data,
  });

export const fetchCompanyNames = (
  companyName: string,
  options: { [s: string]: unknown }
) => {
  return api.get<string[]>(`/search/company/?company_name=${companyName}`, {
    ...options,
  });
};
