import { v4 } from "uuid";

interface Keyword {
  id: string;
  text: string;
}

interface IProps {
  keywords: Keyword[];
  setKeywords: React.ChangeEventHandler<HTMLInputElement> | undefined;
  deleteKeyword: (id: string) => void;
}

const KeywordInput = ({ keywords, setKeywords, deleteKeyword }: IProps) => {
  return (
    <div className="tag-input flex flex-wrap items-center px-4 py-3 rounded-md outline-none border shadow w-full">
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
        className="focus:outline-none w-[90%]"
        onChange={setKeywords}
      />
    </div>
  );
};

export default KeywordInput;
