import { useState } from "react";
import { useQuery } from "react-query";
import { getSearchResults } from "../../api";
import Results from "../../components/Results";
import Skeleton from "react-loading-skeleton";
import spinner from "../../assets/spinner.svg";
import { v4 } from "uuid";
import KeywordInput from "../../components/KeywordInput";
import type { IState } from "./types";
import "react-loading-skeleton/dist/skeleton.css";
import "../../App.css";

function Home() {
  const [state, setState] = useState<IState>({
    first_name: "",
    last_name: "",
    email: "",
    linkedin_username: "",
    keywords: [],
  });

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

  const { isLoading, isFetching, refetch, data, isFetched, isError } = useQuery(
    "search",
    () => getSearchResults({ ...state }),
    {
      enabled: false,
      onSuccess: (results) => {},
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

  return (
    <div className="App">
      <div className="w-[80%] mx-auto my-8 max-w-5xl">
        <h1 className="text-4xl text-center font-semibold my-10">
          Database Search
        </h1>
        <div className="sm:grid grid-cols-2 gap-8">
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
              placeholder="johndoe@gmail.com"
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
              Keywords
            </label>
            <KeywordInput
              keywords={state.keywords}
              setKeywords={setKeywords}
              deleteKeyword={deleteKeyword}
            />
          </div>
        </div>
        <div className="flex justify-center md:justify-end py-5">
          <button
            className="bg-blue-800 flex items-center justify-between outline-none font-semibold hover:bg-blue-900 text-white rounded-md py-2.5 shadow px-10 my-4 disabled:bg-gray-400 transition-all"
            onClick={() => refetch()}
            disabled={
              !state.first_name &&
              !state.last_name &&
              !state.email &&
              !state.linkedin_username &&
              !state.keywords.length
            }
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
              <Skeleton count={3} height={100} />
            </div>
          )}
          {isError && !isFetching && (
            <div className="bg-red-100 p-5 text-center font-semibold text-red-600 rounded-md">
              No Results found!
            </div>
          )}
          {isFetched && data && !isError && !isFetching && (
            <Results results={data.data} />
          )}
        </>
      </div>
    </div>
  );
}

export default Home;
