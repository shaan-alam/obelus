import { getSingleBarkData } from "api";
import { BarkLead } from "pages/Bark/types";
import { useQuery } from "react-query";

const useSingleBarkData = (id: string, setLead: React.Dispatch<React.SetStateAction<BarkLead | null>>) => {
 return  useQuery(
    ["bark-single-lead", id],
    () => getSingleBarkData(id as string),
    {
      refetchOnWindowFocus: false,
      onSuccess: (result) => {
        setLead(result.data);
      },
    }
  );
}

export default useSingleBarkData