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
    <div className="containersm:w-[100%] mx-auto sm:flex block bg-gray-50">
      <div className="block sidebar sm:w-[50%] p-12 h-screen overflow-y-auto border-r">
        <div className="logo mb-8">
          <h1 className="text-gray-900 text-xl font-bold">
            Global Database Search
          </h1>
        </div>
        <div className="md:grid grid-cols-3 gap-8">
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
            <KeywordInput
              placeholder="Enter Email"
              keywords={state.emails}
              onSelect={(value) => {
                setState((state) => ({
                  ...state,
                  emails: [...state.emails, value],
                }));
              }}
              onDelete={(value: string) => {
                setState((state) => ({
                  ...state,
                  emails: state.emails.filter((email) => email !== value),
                }));
              }}
            />
          </div>
          <div className="field my-4">
            <label htmlFor="" className="block mb-2 text-gray-800">
              LinkedIn Username
            </label>
            <KeywordInput
              placeholder="Enter Linkedin Username"
              keywords={state.linkedin_usernames}
              onSelect={(value: string) => {
                setState((state) => ({
                  ...state,
                  linkedin_usernames: [...state.linkedin_usernames, value],
                }));
              }}
              onDelete={(value: string) => {
                setState((state) => ({
                  ...state,
                  linkedin_usernames: state.linkedin_usernames.filter(
                    (username) => username !== value
                  ),
                }));
              }}
            />
          </div>
          <div className="field my-4">
            <label htmlFor="" className="block mb-2 text-gray-800">
              Company Name
            </label>
            <KeywordInput
              placeholder="Enter Company Name"
              keywords={state.job_company_names}
              onSelect={(value) => {
                setState((state) => ({
                  ...state,
                  job_company_names: [...state.job_company_names, value],
                }));
              }}
              onDelete={(value: string) => {
                setState((state) => ({
                  ...state,
                  job_company_names: state.job_company_names.filter(
                    (name) => name !== value
                  ),
                }));
              }}
            />
            {/* <LiveSearch
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
          /> */}
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
              Keywords (to be included)
            </label>
            <KeywordInput
              placeholder="Enter Keywords"
              keywords={state.keywords}
              onSelect={(value) => {
                setState((state) => ({
                  ...state,
                  keywords: [...state.keywords, value],
                }));
              }}
              onDelete={(value: string) => {
                setState((state) => ({
                  ...state,
                  keywords: state.keywords.filter(
                    (keyword) => keyword !== value
                  ),
                }));
              }}
            />
          </div>
          <div className="field my-4">
            <label htmlFor="" className="block mb-2 text-gray-800">
              Keywords (not included)
            </label>
            <KeywordInput
              placeholder="Enter Keywords"
              keywords={state.keywordsNotIncluded}
              onSelect={(value) => {
                setState((state) => ({
                  ...state,
                  keywordsNotIncluded: [...state.keywordsNotIncluded, value],
                }));
              }}
              onDelete={(value: string) => {
                setState((state) => ({
                  ...state,
                  keywordsNotIncluded: state.keywordsNotIncluded.filter(
                    (keyword) => keyword !== value
                  ),
                }));
              }}
            />
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
            <label htmlFor="" className="block mb-2 text-gray-800">
              School Name
            </label>
            <KeywordInput
              placeholder="Enter School Names"
              keywords={state.school_names}
              onSelect={(value) => {
                setState((state) => ({
                  ...state,
                  school_names: [...state.school_names, value],
                }));
              }}
              onDelete={(value: string) => {
                setState((state) => ({
                  ...state,
                  school_names: state.school_names.filter(
                    (school) => school !== value
                  ),
                }));
              }}
            />
          </div>
          <div className="field my-4">
            <label htmlFor="" className="block mb-2 text-gray-800">
              Education
            </label>
            <KeywordInput
              placeholder="Enter Education"
              keywords={state.education_keywords}
              onSelect={(value) => {
                setState((state) => ({
                  ...state,
                  education_keywords: [...state.education_keywords, value],
                }));
              }}
              onDelete={(value: string) => {
                setState((state) => ({
                  ...state,
                  education_keywords: state.education_keywords.filter(
                    (school) => school !== value
                  ),
                }));
              }}
            />
          </div>
          <div className="field my-4">
            <label htmlFor="" className="block mb-2 text-gray-800">
              Salary Range
            </label>
            <div className="range-container flex items-center">
              <div className="range w-full mr-2">
                <div className="range-slider">
                  <span className="range-selected"></span>
                </div>
                <div className="range-input">
                  <input
                    type="range"
                    className="min"
                    min="0"
                    max="500000"
                    value={state.salaryRange?.min as number}
                    onChange={(e) =>
                      setState({
                        ...state,
                        salaryRange: {
                          ...state.salaryRange,
                          min: +e.target.value,
                        },
                      })
                    }
                    step="50000"
                  />
                  <input
                    type="range"
                    className="max"
                    min="500000"
                    max="1000000"
                    value={state.salaryRange.max as number}
                    onChange={(e) =>
                      setState({
                        ...state,
                        salaryRange: {
                          ...state.salaryRange,
                          max: +e.target.value,
                        },
                      })
                    }
                    step="50000"
                  />
                </div>
              </div>
              <p className="w-full">
                {Intl.NumberFormat("en", { notation: "compact" }).format(
                  state.salaryRange?.min as number
                )}
                &nbsp; -&nbsp;
                {Intl.NumberFormat("en", { notation: "compact" }).format(
                  state.salaryRange?.max as number
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="field my-4 flex justify-end">
          <button
            className="bg-blue-800 flex items-center justify-center outline-none font-semibold hover:bg-blue-900 text-white rounded-md py-2.5 shadow px-10 my-4 disabled:bg-gray-400 transition-all"
            onClick={() => {
              navigate("?page_no=1");
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
      <div className="main-panel sm:w-[50%] p-12 h-screen overflow-y-auto">
        <>
          {!isLoading && !isFetching && data && (
            <div className="p-4 rounded-md bg-gray-200 text-gray-800 font-semibold">
              <a
                href="#!"
                className="underline flex items-center"
                onClick={() => download()}
              >
                {isDownloading && <img src={spinnerDark} alt="" />}
                Download all results (limit 10k)
              </a>
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
