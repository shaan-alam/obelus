import { useState, useEffect } from "react";
import { spinnerDark } from "assets";
import { v4 } from "uuid";
import Skeleton from "react-loading-skeleton";

interface Props {
  options: string[] | undefined;
  values: string[];
  onSelect: (country: string) => void;
  onDelete: (countryCode: string) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const LiveSearch = ({
  options,
  values,
  onSelect,
  onDelete,
  query,
  setQuery,
  isLoading,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [items, setItems] = useState<string[]>(options as string[]);

  useEffect(() => {
    const toggleDropdown = (e: any) => {
      if (
        !e.target.classList.contains("dropdown") &&
        !e.target.classList.contains("multiselect_input") &&
        !e.target.classList.contains("select_option")
      ) {
        setIsActive(false);
      }
    };

    window.addEventListener("click", toggleDropdown);

    return () => window.removeEventListener("click", toggleDropdown);
  }, []);

  return (
    <div
      className={`multiselect relative flex items-center flex-wrap rounded-md py-3 px-4 outline-none border bg-white shadow w-full`}
    >
      {values.length > 0 && (
        <div className="flex flex-wrap">
          {values.map((country) => (
            <div
              className="tag bg-gray-300 font-normal text-gray-600 mr-1 p-1 rounded-md text-sm mb-1"
              key={v4()}
            >
              <p>
                {country}&nbsp;
                <span
                  className="inline text-lg cursor-pointer"
                  onClick={() => onDelete(country)}
                >
                  &times;
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between w-full">
        <input
          type="text"
          className="multiselect_input outline-none w-full"
          value={query}
          placeholder="Country"
          onFocus={() => setIsActive(true)}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {isActive && query && (
        <div className="dropdown bg-white rounded-md my-2 shadow-md p-2 absolute top-[100%] left-0 z-[100] h-[300px] overflow-y-auto w-full">
          {!isLoading && options?.length === 0 && (
            <p className="text-gray-600 text-center my-4">No Results found!!</p>
          )}
          {isLoading && <Skeleton count={5} className="h-7 mt-4" />}
          {!isLoading &&
            options?.map((option) => (
              <span
                key={v4()}
                className="select_option block cursor-pointer py-2 hover:bg-gray-100 px-2 rounded-md text-gray-800 hover:text-black"
                onClick={() => {
                  if (values.indexOf(option) < 0) onSelect(option);
                  setQuery("");
                }}
              >
                {option}
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

export default LiveSearch;
