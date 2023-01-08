import { Dispatch, SetStateAction} from 'react';
import { AxiosError } from 'axios';
import { getSearchResults } from 'api';
import { useQuery } from 'react-query';
import { IState } from 'pages/Home/types';
import { Error } from 'pages/Home/types';


const useLeads = (state: IState, page_number: string, setError: Dispatch<SetStateAction<Error>>) => {
  return useQuery(
    "search",
    () =>
      getSearchResults({ ...state, page_no: (page_number as string) || "1" }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onError: (err) => {
        const error = err as AxiosError;
        if (error?.response?.status === 507) {
          setError({ status: 507, text: "Exceeded Limit" });
        } else if (error?.response?.status === 404) {
          setError({ status: 404, text: "No Results Found!" });
        }
      },
    }
  );
}

export default useLeads;