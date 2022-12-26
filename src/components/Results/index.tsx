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
  return (
    <div className="bg-white my-8">
      <h1 className="font-bold text-black text-lg mb-8">
        Results: <span className="text-gray-600">{results.total_results}</span>
      </h1>
      <div className="cards">
        {results.results.map((result) => (
          <Card card={result} key={v4()} />
        ))}
      </div>
    </div>
  );
};

export default Results;
