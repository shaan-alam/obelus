import { useState, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import { v4 } from "uuid";

interface Country {
  code: string;
  name: string;
}

interface Props {
  options: Country[];
  values: Country[];
  onSelect: (country: Country) => void;
  onDelete: (countryCode: string) => void;
}

const MultiSelect = ({ options, values, onSelect, onDelete }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<
    Array<{ name: string; code: string }>
  >([]);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<typeof options>(options);

  const addCountry = (country: { code: string; name: string }) => {
    if (selectedCountries.indexOf(country) < 0) {
      setSelectedCountries((countries) => [...countries, country]);
    }
  };

  useEffect(() => {
    const toggleDropdown = (e: any) => {
      if (
        !e.target.classList.contains("dropdown") &&
        !e.target.classList.contains("multiselect_input") &&
        !e.target.classList.contains("select_option") &&
        e.target.classList.contains("dropdown_toggler")
      ) {
        setIsActive(false);
      }
    };

    window.addEventListener("click", toggleDropdown);

    return () => window.removeEventListener("click", toggleDropdown);
  }, []);

  useEffect(() => {
    if (!query) {
      setItems([...options]);
    } else {
      setItems((item) =>
        items.filter((item) =>
          item.name.toLowerCase().match(query.toLowerCase())
        )
      );
    }
  }, [query, setQuery]);

  return (
    <div
      className={`multiselect relative flex items-center flex-wrap rounded-md py-3 px-4 outline-none border bg-white shadow w-full`}
    >
      {values.length > 0 && (
        <div className="flex flex-wrap">
          {values.map((country) => (
            <div className="tag bg-gray-300 font-normal text-gray-600 mr-1 p-1 rounded-md text-sm mb-1">
              <p key={v4()}>
                {country.name}&nbsp;
                <span
                  className="inline text-lg cursor-pointer"
                  onClick={() => onDelete(country.code)}
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
          placeholder="Country"
          onFocus={() => setIsActive(true)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span
          onClick={() => setIsActive(!isActive)}
          className="dropdown_toggler"
        >
          <HiChevronDown
            size={25}
            className={`block p-1 hover:bg-gray-200 rounded-full cursor-pointer transition-transform ${
              isActive ? "rotate-180" : ""
            }`}
          />
        </span>
      </div>
      {isActive && (
        <div className="dropdown bg-white rounded-md my-2 shadow-md p-2 absolute top-[100%] left-0 z-1 h-[300px] overflow-y-auto w-full">
          {items.length === 0 && (
            <p className="text-gray-600 text-center my-4">
              No Countries found!!
            </p>
          )}
          {items.map((option) => (
            <span
              key={v4()}
              className="select_option block cursor-pointer py-2 hover:bg-gray-100 px-2 rounded-md text-gray-800 hover:text-black"
              onClick={() => {
                if (values.indexOf(option) < 0) onSelect(option);
                setQuery("");
              }}
            >
              {option.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
