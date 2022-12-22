import axios from "axios";
import type { APIResponse, Lead } from "../types";
import type { Keyword } from "../pages/Home/types";

interface IParameters {
  first_name?: string;
  last_name?: string;
  email?: string;
  linkedin_username?: string;
  keywords: Keyword[];
}

export const api = axios.create({
  baseURL: "https://project-x-ney5.onrender.com/",
});

export const getSearchResults = (parameters: IParameters) =>
  api.post<APIResponse>("/search", { ...parameters });

export const getSingleLead = (id: string) => api.get<Lead>(`/search/${id}`);
