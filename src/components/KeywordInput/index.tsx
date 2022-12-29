import type { IProps } from "./types";
import { v4 } from "uuid";

const KeywordInput = ({ keywords, setState }: IProps) => {
  const setKeywords: React.ChangeEventHandler<HTMLInputElement> | undefined = (
    e
  ) => {
    if (e.target.value.endsWith(",")) {
      const newKeyword = {
        id: v4(),
        text: e.target.value.substring(0, e.target.value.length - 1),
      };

      setState((state) => ({
        ...state,
        keywords: [...state.keywords, newKeyword],
      }));

      e.target.value = "";
    }
  };

  const deleteKeyword = (id: string) => {
    setState((state) => ({
      ...state,
      keywords: state.keywords.filter((keyword) => keyword.id !== id),
    }));
  };

  return (
    <div className="tag-input flex flex-wrap items-center bg-white rounded-md outline-none border shadow w-full">
      {keywords?.map((keyword) => (
        <div className="tag bg-gray-300 font-normal text-gray-600 mr-1 p-1 rounded-md text-sm mb-1">
          {keyword.text}&nbsp;
          <span
            className="inline text-lg cursor-pointer"
            onClick={() => deleteKeyword(keyword.id)}
          >
            &times;
          </span>
        </div>
      ))}
      <input
        type="text"
        placeholder="Enter keyword"
        className="focus:outline-none w-[90%] px-4 py-3 "
        onChange={setKeywords}
      />
    </div>
  );
};

export default KeywordInput;
