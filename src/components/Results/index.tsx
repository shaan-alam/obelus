import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import Card from "../Card";
import { v4 } from "uuid";
import { Lead } from "../../types";
import classNames from "classnames";
import ExportModal from "../Modal/ExportModal";
import { useLocation } from "react-router-dom";

interface IResults {
  results: Lead[];
  totalResults: number;
}

const Results = ({ results, totalResults }: IResults) => {
  const [selectedDocuments, setSelectedDocuments] = useState<Lead[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [exportChoice, setExportChoice] = useState("");
  const [areAllSelected, setAreAllSelected] = useState(false);

  useEffect(() => {
    if (selectedDocuments.length !== results.length) {
      setAreAllSelected(false);
    }
  }, selectedDocuments);

  const onSelect = (lead: Lead) => {
    if (selectedDocuments.indexOf(lead) >= 0) {
      setSelectedDocuments(
        selectedDocuments.filter((doc) => doc._id !== lead._id)
      );
    } else {
      setSelectedDocuments([...selectedDocuments, lead]);
    }
  };

  const { search } = useLocation();
  const page_number = +search.split("=")[1] || 1;

  return (
    <>
      <div className="flex items-center justify-between my-8">
        <div>
          <h1 className="font-bold text-gray-800 text-lg">
            <input
              type="checkbox"
              id="are-all-selected"
              checked={areAllSelected}
              onChange={() => {
                setAreAllSelected(!areAllSelected);
                if (selectedDocuments.length !== results.length)
                  setSelectedDocuments(results);
                else {
                  setSelectedDocuments([]);
                }
              }}
            />
            &nbsp;
            <label htmlFor="are-all-selected">Select All</label>
          </h1>
          <h1 className="text-gray-500">
            Showing {(page_number - 1) * 50 + 1} -{" "}
            {totalResults > 50 ? page_number * 50 : totalResults} results out of{" "}
            {totalResults} results
          </h1>
        </div>
        <div className="dropdown-container">
          <Menu>
            <Menu.Button
              className="bg-blue-800 relative outline-none font-semibold hover:bg-blue-900 text-white rounded-md py-2.5 shadow px-10 disabled:bg-gray-400 transition-all"
              disabled={selectedDocuments.length === 0}
            >
              Export
            </Menu.Button>
            <Menu.Items className="absolute flex my-2 flex-col bg-white rounded-md shadow p-4 text-center w-[130px] z-[1] outline-none">
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={() => {
                      setExportChoice("CSV");
                      setIsOpen(true);
                    }}
                    className={classNames(
                      "p-2 text-gray-800 cursor-pointer rounded-md",
                      active ? "bg-gray-100 text-black" : ""
                    )}
                  >
                    CSV
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={() => {
                      setExportChoice("JSON");
                      setIsOpen(true);
                    }}
                    className={classNames(
                      "p-2 text-gray-800 cursor-pointer rounded-md",
                      active ? "bg-gray-100 text-black" : ""
                    )}
                  >
                    JSON
                  </span>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <div className="cards">
        {results.map((result) => (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedDocuments.indexOf(result) >= 0}
              onChange={() => onSelect(result)}
              className="ml-[-2rem]"
            />
            <Card key={v4()} card={result} />
          </div>
        ))}
      </div>
      <ExportModal
        title={`Export to ${exportChoice}`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fields={Object.keys(results?.[0]._source)}
        selectedDocuments={selectedDocuments}
        exportChoice={exportChoice}
      />
    </>
  );
};

export default Results;
