import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import "react-loading-skeleton/dist/skeleton.css";
import { spinner, spinnerDark, noResults, searchSVG } from "assets";
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
  const navigate = useNavigate();
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

    const mainPanel = document.querySelector(".main-panel");
    mainPanel?.scrollTo({ top: 0 });
  }, [page_number]);

  return (
    <div className="containersm:w-[100%] mx-auto sm:flex block">
      <div className="block sidebar sm:w-[20%] p-12 h-screen overflow-y-auto">
        <div className="logo mb-8">
          <h1 className="text-gray-900 text-xl font-bold">
            Global Database Search
          </h1>
        </div>
        <div className="field my-4">
          <label htmlFor="" className="block mb-2 text-gray-800">
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
        <div className="field my-4">
          <label htmlFor="" className="block mb-2 text-gray-800">
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
        <div className="field my-4">
          <label htmlFor="" className="block mb-2 text-gray-800">
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
        <div className="field my-4">
          <label htmlFor="" className="block mb-2 text-gray-800">
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
        <div className="field my-4">
          <label htmlFor="" className="block mb-2 text-gray-800">
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
        <div className="field my-4">
          <label htmlFor="" className="block mb-2 text-gray-800">
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
        <div className="field my-4">
          <label htmlFor="" className="block mb-2 text-gray-800">
            Keywords
          </label>
          <KeywordInput keywords={state.keywords} setState={setState} />
        </div>
        <div className="field my-4">
          <label htmlFor="" className="block mb-2 text-gray-800">
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
        <div className="field my-4">
          <label htmlFor="" className="block mb-2 text-gray-800">
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
        <div className="field my-4">
          <button
            className="bg-blue-800 w-full flex items-center justify-center outline-none font-semibold hover:bg-blue-900 text-white rounded-md py-2.5 shadow px-10 my-4 disabled:bg-gray-400 transition-all"
            onClick={() => {
              navigate("?page_no=1")
              refetchLeads();
            }}
            disabled={!checkObjectHasValues(state)}
          >
            {(isLoading || isFetching) && (
              <img src={spinner} className="h-6 w-6 mr-2" />
            )}
            Search
          </button>
        </div>
      </div>
      <div className="main-panel sm:w-[80%] p-12 h-screen overflow-y-auto">
        <>
          {(data?.data?.total_results as number) > 10000 && (
            <div className="bg-gray-200 rounded-md p-4 text-gray-800 font-semibold">
              The results for current query is greater than 10K, please narrow
              down your query!
            </div>
          )}
          {!isLoading && !isFetching && !data && (
            <div className="w-full h-screen flex flex-col justify-center items-center">
              <img src={searchSVG} className="h-48 w-48" />
              <p className="mt-4 text-gray-500">
                Use filters in the sidebar to search...
              </p>
            </div>
          )}
          {(isLoading || isFetching) && (
            <div className="w-full h-screen flex items-center justify-center">
              <img src={spinnerDark} alt="" />
            </div>
          )}
          {!data && error?.status && !isFetching && (
            <div className="h-[90vh] flex flex-col items-center justify-center p-8 text-center">
              {error.status === 404 && (
                <img src={noResults} className="h-48 w-48 mb-4" />
              )}
              <p className="text-gray-500">{error.text}</p>
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
              <Results
                results={data.data.results}
                totalResults={data.data.total_results}
              />
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
