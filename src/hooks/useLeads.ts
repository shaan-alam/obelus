import { getSearchResults } from "api";
import { AxiosError, AxiosResponse } from "axios";
import { IState } from "pages/Home/types"
import { useQuery, UseQueryOptions, UseQueryResult  } from 'react-query';
import { ILeadResponse } from "types";


interface State extends IState {
  page_no: string
}

interface Props {
  state: State,
  configOptions?: Omit<UseQueryOptions<ILeadResponse, unknown, ILeadResponse, string[]>, "queryKey" | "queryFn">
  callback: () => void
}

const useLeads = ({ state, configOptions, callback  }: Props) => {

  const getLeads = async () => {
    try {
      const results = await getSearchResults({...state });
      return results.data;
    } catch (err) {
      const error = err as AxiosError;
      console.log("error status code", error.response?.status);
      callback()
    }
  }

  return useQuery(['leads-search'], () => getSearchResults({ ...state }), {
    enabled: false
  })
}

export default useLeads;