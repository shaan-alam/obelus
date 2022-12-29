import { getSearchResults } from "api";
import { IState } from "pages/Home/types"
import { useQuery, UseQueryOptions } from 'react-query';
import { ILeadResponse } from "types";


interface State extends IState {
  page_no: string
}

interface Props {
  state: State,
  options?: Omit<UseQueryOptions<ILeadResponse, unknown, ILeadResponse, string[]>, "queryKey" | "queryFn">
}

const useLeads = ({ state, options }: Props) => {
  return useQuery(['leads-search'], () => getSearchResults({...state}), {
    ...options
  })
}

export default useLeads;