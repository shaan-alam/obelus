import { getSingleLead } from 'api';
import { Dispatch, SetStateAction } from 'react';
import { useQuery } from 'react-query';
import { Lead } from 'types';

const useSingleLead = (id: string, setLead: Dispatch<SetStateAction<Pick<Lead, "_source"> | null>>) => {
  return  useQuery(
    "search-id",
    () => getSingleLead(id as string),
    {
      refetchOnWindowFocus: false,
      onSuccess: (results) => {
        setLead(results.data);
      },
    }
  );
}

export default useSingleLead;