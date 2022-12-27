import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { downloadResults, getSearchResults } from "../../api";
import Results from "../../components/Results";
import Skeleton from "react-loading-skeleton";
import spinner from "../../assets/spinner.svg";
import spinnerDark from "../../assets/spinner-dark.svg";
import { v4 } from "uuid";
import KeywordInput from "../../components/KeywordInput";
import { initialState, IState } from "./types";
import MultiSelect from "../../components/MultiSelect";
import "react-loading-skeleton/dist/skeleton.css";
import { countries } from "./data";
import Pagination from "../../components/Pagination";
import { useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import { Lead } from "../../types";
import { exportJSONDocuments } from "../../util";
import classNames from "classnames";

// TODO: refactor the code

function Home() {
  const [state, setState] = useState<IState>(initialState);
  const [error, setError] = useState<{ status: number; text: string } | null>(
    null
  );

  const { search } = useLocation();
  const page_number = search.split("=")[1];

  const checkObjectHasValues = <T,>(obj: T) => {
    return (
      Object.values(obj as { [s: string]: unknown }).filter((field) => {
        if (field instanceof Array && field.length > 0) {
          return field;
        } else if (!(field instanceof Array) && field) {
          return field;
        }
      }).length !== 0
    );
  };

  useEffect(() => {
    if (checkObjectHasValues(state)) refetch();

    window.scrollTo({ top: 0 });
  }, [page_number]);

  const setKeywords: React.ChangeEventHandler<HTMLInputElement> | undefined = (
    e
  ) => {
    if (e.target.value.endsWith(",")) {
      const newKeyword = {
        id: v4(),
        text: e.target.value.substring(0, e.target.value.length - 1),
      };

      setState((state) => ({
        ...state,
        keywords: [...state.keywords, newKeyword],
      }));

      e.target.value = "";
    }
  };

  const deleteKeyword = (id: string) =>
    setState({
      ...state,
      keywords: state.keywords.filter((keyword) => keyword.id !== id),
    });

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

  const { isLoading, isFetching, refetch, data, isFetched, isError } = useQuery(
    "search",
    () =>
      getSearchResults({ ...state, page_no: (page_number as string) || "1" }),
    {
      enabled: false,
      onError: (err) => {
        const error = err as AxiosError;
        if (error?.response?.status === 507) {
          setError({ status: 507, text: "Exceeded Limit" });
        } else if (error?.response?.status === 404) {
          setError({ status: 404, text: "No Results Found!" });
        }
      },
    }
  );

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
            <input
              type="text"
              placeholder="Company Name"
              className="py-3 px-4 rounded-md outline-none border shadow w-full"
              name="job_company_name"
              value={state.job_company_name}
              onChange={onChange}
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
            <KeywordInput
              keywords={state.keywords}
              setKeywords={setKeywords}
              deleteKeyword={deleteKeyword}
            />
          </div>
          <div className="my-4 sm:my-0">
            <label htmlFor="" className="block font-medium mb-2">
              Country
            </label>
            <MultiSelect
              options={countries}
              values={state.countries}
              onDelete={(countryCode) => {
                setState({
                  ...state,
                  countries: state.countries.filter(
                    (country) => country.code !== countryCode
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
            onClick={() => refetch()}
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
                  total_results={data?.data.total_results as number}
                  currentPage={+page_number || 1}
                />
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default Home;
