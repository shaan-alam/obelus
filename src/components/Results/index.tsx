import { useContext, useState } from "react";
import Card from "../Card";
import { v4 } from "uuid";
import { Lead } from "../../types";

interface IResults {
  results: {
    results: Lead[];
    total_results: number;
  };
}

const Results = ({ results }: IResults) => {
  const [selectedDocuments, setSelectedDocuments] = useState<Lead[]>([]);

  const exportJSONDocuments = (selectedDocuments: Lead[]) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(selectedDocuments)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
  };

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
    <div className="bg-white my-8">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-black text-lg">
          Results:&nbsp;
          <span className="text-gray-600">{results.total_results}</span>
        </h1>
        <button
          onClick={() => exportJSONDocuments(selectedDocuments)}
          className="bg-blue-800 flex items-center justify-between outline-none font-semibold hover:bg-blue-900 text-white rounded-md py-2.5 shadow px-10 disabled:bg-gray-400 transition-all"
        >
          Export(JSON)
        </button>
      </div>
      <div className="cards">
        {results.results.map((result) => (
          <div className="flex items-center">
            <input type="checkbox" onChange={() => onSelect(result)} />
            <Card key={v4()} card={result} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
