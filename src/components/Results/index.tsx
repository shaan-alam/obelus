import Card from "../Card";
import { v4 } from "uuid";

interface IResults {
  results: {
    data: {
      first_name: string;
      last_name: string;
      email: string;
      linkedin_username: string;
    };
  }[];
}

const Results = ({ results }: IResults) => {
  return (
    <div className="bg-white my-8">
      <h1 className="font-bold text-black text-lg mb-8">Results: </h1>
      <div className="cards sm:grid grid-cols-3 gap-6">
        {results.map((result) => (
          <Card card={result.data} key={v4()} />
        ))}
      </div>
    </div>
  );
};

export default Results;
