import { useContext, useState } from "react";
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
  const [checkedState, setCheckedState] = useState(
    new Array(results.results.length).fill(false)
  );
  const { selectedDocuments, setSelectedDocuments } = useContext(Context);

  function handleOnChange(position: number): void {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    
    console.log("changed");
  }

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
        {results.results.map((result, index) => (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={checkedState[index]}
              onChange={() => handleOnChange(index)}
              id="checkbox"
            />
            <Card card={result} key={v4()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
