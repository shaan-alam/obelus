import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import Card from "../Card";
import { v4 } from "uuid";
import { Lead } from "../../types";
import classNames from "classnames";
import ExportModal from "../Modal/ExportModal";

interface IResults {
  results: {
    results: Lead[];
    total_results: number;
  };
}

const Results = ({ results }: IResults) => {
  const [selectedDocuments, setSelectedDocuments] = useState<Lead[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [exportChoice, setExportChoice] = useState("");
  const [areAllSelected, setAreAllSelected] = useState(false);

  useEffect(() => {
    if (selectedDocuments.length !== results.results.length) {
      setAreAllSelected(false);
    }
  }, selectedDocuments);

  const onSelect = (lead: Lead) => {
    if (selectedDocuments.indexOf(lead) >= 0) {
      setSelectedDocuments(
        selectedDocuments.filter((doc) => doc.data.id !== lead.data.id)
      );
    } else {
      setSelectedDocuments([...selectedDocuments, lead]);
    }
  };

  return (
    <>
      <div className="bg-gray-50 my-8">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-black text-lg">
            <input
              type="checkbox"
              id="are-all-selected"
              checked={areAllSelected}
              onChange={() => {
                setAreAllSelected(!areAllSelected);
                if (selectedDocuments.length !== results.results.length)
                  setSelectedDocuments(results.results);
                else {
                  setSelectedDocuments([]);
                }
              }}
            />
            &nbsp;
            <label htmlFor="are-all-selected">Select All</label>
          </h1>
          <h1 className="font-bold text-black text-lg">
            Results:&nbsp;
            <span className="text-gray-600">{results.total_results}</span>
          </h1>
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
          {results.results.map((result) => (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedDocuments.indexOf(result) >= 0}
                onChange={() => onSelect(result)}
              />
              <Card key={v4()} card={result} />
            </div>
          ))}
        </div>
      </div>
      <ExportModal
        title={`Export to ${exportChoice}`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fields={Object.keys(results?.results[0].data)}
        selectedDocuments={selectedDocuments}
        exportChoice={exportChoice}
      />
    </>
  );
};

export default Results;
