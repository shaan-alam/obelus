import { fetchCompanyNames } from "api";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";


const useCompanyNames = (debouncedValue: string, setCompanyOptions: Dispatch<SetStateAction<string[] | undefined>>) => {
  const { refetch: fetchCompanies, isFetching: isLoadingCountries } = useQuery(
    ["fetch-company-names"],
    ({ signal }) => fetchCompanyNames(debouncedValue, { signal }),
    {
      enabled: false,
      onSuccess: (results) => {
        console.log(results.data);
        setCompanyOptions(results.data);
      },
    }
  );


  return {
    fetchCompanies,
    isLoadingCountries
  }
}

export default useCompanyNames;