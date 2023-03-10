import classNames from "classnames";
import { v4 } from "uuid";
import type { IProps } from "./types";

const KeywordInput = ({
  keywords,
  onDelete,
  onSelect,
  placeholder,
}: IProps) => {
  const setKeywords: React.ChangeEventHandler<HTMLInputElement> | undefined = (
    e
  ) => {
    const inputValue = e.target.value;
    if (inputValue.indexOf(",") >= 0 && !inputValue.endsWith(",")) {
      const keywords = e.target.value.split(",");

      keywords.forEach((keyword) => {
        onSelect(keyword);
      });

      e.target.value = "";
    } else if (inputValue.endsWith(",")) {
      const newKeyword = e.target.value.substring(0, e.target.value.length - 1);

      onSelect(newKeyword);
      e.target.value = "";
    }
  };

  return (
    <div
      className={classNames(
        "tag-input flex flex-wrap items-center bg-white rounded-md outline-none border shadow w-full",
        keywords.length > 0 ? "p-2" : ""
      )}
    >
      {keywords?.map((keyword) => (
        <div
          className="tag bg-gray-300 font-normal text-gray-600 mr-1 p-1 rounded-md text-sm mb-1"
          key={v4()}
        >
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
        placeholder={placeholder}
        type="text"
        className="focus:outline-none w-[90%] px-4 py-3 "
        onChange={setKeywords}
      />
    </div>
  );
};

export default KeywordInput;
