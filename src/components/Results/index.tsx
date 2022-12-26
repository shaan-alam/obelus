import { useContext } from "react";
import Card from "../Card";
import { v4 } from "uuid";
import { Lead } from "../../types";
import { Context } from "../../context";

interface IResults {
  results: {
    results: Lead[];
    total_results: number;
  };
}

const Results = ({ results }: IResults) => {
  const { exportJSONDocuments } = useContext(Context);

  return (
    <div className="bg-white my-8">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-black text-lg mb-8">
          Results:&nbsp;
          <span className="text-gray-600">{results.total_results}</span>
        </h1>
        <button onClick={() => exportJSONDocuments()}>Export(JSON)</button>
      </div>
      <div className="cards">
        {results.results.map((result) => (
          <Card card={result} key={v4()} />
        ))}
      </div>
    </div>
  );
};

export default Results;
