import { useState } from "react";
import { useQuery } from "react-query";
import { api, getSearchResults } from "./api";
import Results from "./components/Results";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface IState {
  first_name?: string;
  last_name?: string;
  email?: string;
  linkedin_username?: string;
}

function App() {
  const [state, setState] = useState<IState>({
    first_name: "",
    last_name: "",
    email: "",
    linkedin_username: "",
  });

  const { isLoading, isFetching, refetch, data, isFetched, isError } = useQuery(
    "search",
    () => getSearchResults({ ...state }),
    {
      enabled: false,
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
      <div className="w-[80%] mx-auto my-8">
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
        </div>
        <button
          className="bg-blue-800 outline-none font-medium hover:bg-blue-900 text-white rounded-md py-2 shadow px-10 my-4 disabled:bg-gray-400 transition-all"
          onClick={() => refetch()}
          disabled={
            !state.first_name &&
            !state.last_name &&
            !state.email &&
            !state.linkedin_username
          }
        >
          Search
        </button>
        <>
          {(isLoading || isFetching) && (
            <div className="w-full sm:grid grid-cols-3 gap-6">
              <Skeleton height={200} />
              <Skeleton height={200} />
              <Skeleton height={200} />
              <Skeleton height={200} />
              <Skeleton height={200} />
              <Skeleton height={200} />
            </div>
          )}
          {isFetched && isError && !isFetching && (
            <div className="bg-red-200 p-2 text-center text-red-600 font-semibold rounded-md">
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

export default App;
