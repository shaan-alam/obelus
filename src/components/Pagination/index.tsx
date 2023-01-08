import { useState, useEffect } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

const Pagination = ({
  total_results,
  currentPage,
}: {
  total_results: number;
  currentPage: number;
}) => {
  const numberOfPages = Math.floor(total_results / 50);
  const pages = new Array(10).fill(0, 0, numberOfPages);

  const { search } = useLocation();
  const page_number = +search.split("=")[1] || 1;

  const [gotoPage, setGotoPage] = useState<number | null>();

  useEffect(() => {
    setGotoPage(page_number);
  }, [page_number]);

  return (
    <div className="pagination-container flex flex-col items-center w-full">
      <p className="text-gray-600 mb-4">Pages: </p>
      <div className="pagination flex flex-wrap w-full text-center justify-center items-center">
        <Link to={`?page_no=${page_number <= 0 ? 1 : page_number - 1}`}>
          <p className="page-no h-10 w-10 rounded-md  transition-colors p-2 cursor-pointer mr-16 mb-4">
            Previous
          </p>
        </Link>
        {pages.map((_, index) => (
          <Link to={`?page_no=${index + 1}`}>
            <p
              className={classNames(
                "page-no h-10 w-10 rounded-md  transition-colors p-2 cursor-pointer mr-8 mb-4",
                currentPage === index + 1
                  ? "bg-blue-800 text-white hover:bg-blue-900"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              )}
            >
              {index + 1}
            </p>
          </Link>
        ))}
        <Link
          to={`?page_no=${
            page_number === numberOfPages ? numberOfPages : page_number + 1
          }`}
        >
          <p className="page-no h-10 w-10 rounded-md  transition-colors p-2 cursor-pointer mr-8 mb-4">
            Next
          </p>
        </Link>
        <div className="text-gray-600 mb-4">
          Total {numberOfPages} pages: Go To Page
          <input
            type="text"
            className="w-[50px] p-2 mx-2 outline-none border border-gray-500 rounded-md"
            value={`${gotoPage}`}
            onChange={(e) => setGotoPage(+e.target.value)}
          />
          <Link to={`?page_no=${gotoPage === 0 ? 1 : gotoPage}`}>
            <button className="bg-blue-800 text-white p-2 rounded-md">
              Go
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
