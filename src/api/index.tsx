import axios from "axios";
import type { AxiosResponse } from "axios";
import type { APIResponse, Lead } from "../types";

interface IParameters {
  first_name?: string;
  last_name?: string;
  email?: string;
  linkedin_username?: string;
}

export const api = axios.create({
  baseURL: "https://project-x-ney5.onrender.com/",
});

export const getSearchResults = (parameters: IParameters) =>
  api.post<APIResponse>("/search", { ...parameters });

export const getSingleLead = (id: string) => api.get<Lead>(`/search/${id}`);
