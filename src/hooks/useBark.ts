import { getBarkData } from "api";
import { BarkLead } from "pages/Bark/types";
import { useQuery } from "react-query";

const useBark = (setLeads: React.Dispatch<React.SetStateAction<BarkLead[] | null>>) => {
  return useQuery(
    ["bark-data"],
    () => getBarkData(),
    {
      onSuccess: (results) => {
        setLeads([...results.data]);
      },
      refetchOnWindowFocus: false,
    }
  );
}

export default useBark