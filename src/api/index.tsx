import axios from "axios";

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
  api.post("/search", { ...parameters });
