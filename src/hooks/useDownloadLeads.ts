import { useQuery } from 'react-query'
import { downloadResults } from 'api';
import { IState } from 'pages/Home/types';
import { Lead } from 'types';
import { exportJSONDocuments } from 'util/';

const useDownloadLeads = (state: IState) => {
  const { refetch: download, isLoading: isDownloading } = useQuery(
    ["download-data"],
    () => downloadResults(state),
    {
      enabled: false,
      onSuccess: (results) => {
        exportJSONDocuments<Lead[]>(results.data);
      },
    }
  );

  return { download, isDownloading }
}

export default useDownloadLeads