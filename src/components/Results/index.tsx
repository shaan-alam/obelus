import Card from "../Card";
import { v4 } from "uuid";
import { Lead } from "../../types";

interface IResults {
  results: Lead[];
}

const Results = ({ results }: IResults) => {
  return (
    <div className="bg-white my-8">
      <h1 className="font-bold text-black text-lg mb-8">Results: </h1>
      <div className="cards">
        {results.map((result) => (
          <Card card={result} key={v4()} />
        ))}
      </div>
    </div>
  );
};

export default Results;
