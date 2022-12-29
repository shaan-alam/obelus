import { downloadResults, getSearchResults } from "api";
import { IState } from "pages/Home/types"
import { useQuery, UseQueryOptions } from 'react-query';
import { ILeadResponse } from "types";

interface Props {
  state: IState,
  options?: Omit<UseQueryOptions<ILeadResponse, unknown, ILeadResponse, string[]>, "queryKey" | "queryFn">
}

const useDownloadLeads = ({ state, options }: Props) => {
  const { refetch, isLoading } = useQuery(['download-data'], () => downloadResults({...state}), {
    ...options
  })

  return { download: refetch, isDownloading: isLoading }
}

export default useDownloadLeads;