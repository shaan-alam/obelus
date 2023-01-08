import type { IProps } from "./types";

const KeywordInput = ({ keywords, onDelete, onSelect }: IProps) => {
  const setKeywords: React.ChangeEventHandler<HTMLInputElement> | undefined = (
    e
  ) => {
    if (e.target.value.endsWith(",")) {
      const newKeyword = e.target.value.substring(0, e.target.value.length - 1);

      onSelect(newKeyword);

      e.target.value = "";
    }
  };

  return (
    <div className="tag-input p-2 flex flex-wrap items-center bg-white rounded-md outline-none border shadow w-full">
      {keywords?.map((keyword) => (
        <div className="tag bg-gray-300 font-normal text-gray-600 mr-1 p-1 rounded-md text-sm mb-1">
          {keyword}&nbsp;
          <span
            className="inline text-lg cursor-pointer"
            onClick={() => onDelete(keyword)}
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
