import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import "react-loading-skeleton/dist/skeleton.css";
import { spinner, spinnerDark } from "assets";
import { Error, initialState, IState } from "./types";
import {
  Results,
  KeywordInput,
  MultiSelect,
  Pagination,
  LiveSearch,
} from "components";
import { countries } from "./data";
import { checkObjectHasValues } from "util/";
import { useQueryClient } from "react-query";
import {
  useLeads,
  useDebounce,
  useDownloadLeads,
  useCompanyNames,
} from "hooks";

const Home: React.FC = () => {
  const client = useQueryClient();
  const [state, setState] = useState<IState>(initialState);
  const [error, setError] = useState<Error>(null);
  const [companyOptions, setCompanyOptions] = useState<string[] | undefined>(
    []
  );
  const [companyNameQuery, setCompanyNameQuery] = useState("");
  const debouncedValue = useDebounce(companyNameQuery, 1000);

  const { search } = useLocation();
  const page_number = search.split("=")[1];

  const { download, isDownloading } = useDownloadLeads(state);

  const { fetchCompanies, isLoadingCountries } = useCompanyNames(
    debouncedValue,
    setCompanyOptions
  );

  const {
    isLoading,
    isFetching,
    refetch: refetchLeads,
    data,
    isFetched,
    isError,
  } = useLeads(state, page_number, setError);

  const onChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (
    e
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // set error to null if another request is made
    if (isLoading) setError(null);
  }, [isLoading]);

  useEffect(() => {
    // Cancel the previous API request if the debounce value is changed
    client.cancelQueries(["fetch-company-names"]);

    if (debouncedValue !== "") fetchCompanies();
  }, [debouncedValue]);

  useEffect(() => {
    if (checkObjectHasValues(state)) refetchLeads();

    window.scrollTo({ top: 0 });
  }, [page_number]);

  return (
    <div className="App">
      <div className="w-[80%] mx-auto my-8 max-w-5xl">
        <h1 className="text-4xl text-center font-semibold my-10">
          Database Search
        </h1>
        <div className="sm:grid grid-cols-3 gap-8">
          <div className="my-4 sm:my-0">
            <label htmlFor="" className="block font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              placeholder="John"
              className="py-3 px-4 rounded-md outline-none border bg-white shadow w-full"
              value={state?.first_name}
              name="first_name"
              onChange={onChange}
            />
          </div>
          <div className="my-4 sm:my-0">
            <label htmlFor="" className="block font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Doe"
              className="py-3 px-4 rounded-md outline-none border shadow w-full"
              name="last_name"
              value={state.last_name}
              onChange={onChange}
            />
          </div>
          <div className="my-4 sm:my-0">
            <label htmlFor="" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="text"
              placeholder="johndoe@domain.com"
              className="py-3 px-4 rounded-md outline-none border shadow w-full"
              name="email"
              value={state.email}
              onChange={onChange}
            />
          </div>
          <div className="my-4 sm:my-0">
            <label htmlFor="" className="block font-medium mb-2">
              LinkedIn Username
            </label>
            <input
              type="text"
              placeholder="johndoe123"
              className="py-3 px-4 rounded-md outline-none border shadow w-full"
              name="linkedin_username"
              value={state.linkedin_username}
              onChange={onChange}
            />
          </div>
          <div className="my-4 sm:my-0">
            <label htmlFor="" className="block font-medium mb-2">
              Company Name
            </label>
            <LiveSearch
              isLoading={isLoadingCountries}
              query={companyNameQuery}
              setQuery={setCompanyNameQuery}
              options={companyOptions}
              values={state.job_company_names}
              onDelete={(comanpyName) => {
                setState({
                  ...state,
                  job_company_names: state.job_company_names.filter(
                    (company) => company !== comanpyName
                  ),
                });
              }}
              onSelect={(company) =>
                setState({
                  ...state,
                  job_company_names: [...state.job_company_names, company],
                })
              }
            />
          </div>
          <div className="my-4 sm:my-0">
            <label htmlFor="" className="block font-medium mb-2">
              Company Website
            </label>
            <input
              type="text"
              placeholder="www.yourwebsite.com"
              className="py-3 px-4 rounded-md outline-none border shadow w-full"
              name="job_company_website"
              value={state.job_company_website}
              onChange={onChange}
            />
          </div>
          <div className="my-4 sm:my-0">
            <label htmlFor="" className="block font-medium mb-2">
              Keywords
            </label>
            <KeywordInput keywords={state.keywords} setState={setState} />
          </div>
          <div className="my-4 sm:my-0">
            <label htmlFor="" className="block font-medium mb-2">
              Country
            </label>
            <MultiSelect
              options={countries}
              values={state.countries}
              onDelete={(countryName) => {
                setState({
                  ...state,
                  countries: state.countries.filter(
                    (country) => country !== countryName
                  ),
                });
              }}
              onSelect={(country) =>
                setState({ ...state, countries: [...state.countries, country] })
              }
            />
          </div>
          <div className="my-4 sm:my-0">
            <label htmlFor="" className="block font-medium mb-2">
              Phone
            </label>
            <input
              type="text"
              placeholder="555-555-5555"
              className="py-3 px-4 rounded-md outline-none border shadow w-full"
              name="phone"
              value={state.phone}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex justify-center md:justify-end py-5">
          <button
            className="bg-blue-800 flex items-center justify-between outline-none font-semibold hover:bg-blue-900 text-white rounded-md py-2.5 shadow px-10 my-4 disabled:bg-gray-400 transition-all"
            onClick={() => refetchLeads()}
            disabled={!checkObjectHasValues(state)}
          >
            {(isLoading || isFetching) && (
              <img src={spinner} className="h-6 w-6 mr-2" />
            )}
            Search
          </button>
        </div>

        <>
          {(isLoading || isFetching) && (
            <div className="w-full">
              <Skeleton count={6} height={100} className="mb-4" />
            </div>
          )}
          {error?.status && !isFetching && (
            <div className="bg-red-100 flex items-center p-8 text-center font-semibold text-red-600 rounded-md">
              <p>{error.text}</p>
              {error.status === 507 && (
                <button
                  className={classNames(
                    "ml-4 underline flex items-center",
                    isDownloading
                      ? "no-underline text-gray-600 cursor-default"
                      : ""
                  )}
                  onClick={() => download()}
                >
                  {isDownloading && <img src={spinnerDark} />}
                  {isDownloading ? "Downloading..." : "Download Results"}
                </button>
              )}
            </div>
          )}
          {isFetched && data && !isError && !isFetching && (
            <>
              <Results results={data.data} />
              {data.data.total_results > 50 && (
                <Pagination
                  total_results={data?.data.total_results}
                  currentPage={+page_number || 1}
                />
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Home;
