import { useState } from "react";
import { HiChevronDown, HiExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Lead } from "../../types";

const Card = ({ card: { data } }: { card: Lead }) => {
  const [isActive, setIsActive] = useState(false);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      className={`my-6 card bg-white rounded-md py-6 px-8 border ${
        isActive ? "h-auto" : "sm:h-[150px]"
      }`}
    >
      <div className="accordian-body flex items-center justify-between w-full pb-4">
        <ul className="text-black">
          <li className="mb-2 font-bold text-xl">
            {capitalizeFirstLetter(data?.first_name)}&nbsp;
            {capitalizeFirstLetter(data?.last_name)}
          </li>
          <li className="font-medium">
            Email:&nbsp;
            <span className="text-black font-normal">
              {data.emails[0] ? data.emails[0].address : "NA"}
            </span>
          </li>
          <li className="font-medium">
            LinkedIn Username:&nbsp;
            <span className="text-black font-normal">
              {data.linkedin_username}
            </span>
          </li>
        </ul>
        <a href="#!" onClick={() => setIsActive(!isActive)}>
          <HiChevronDown
            size={40}
            className={`p-2 text-gray-600 rounded-full hover:bg-gray-200 transition-all ${
              isActive ? "rotate-180" : "rotate-0"
            }`}
          />
        </a>
      </div>
      {isActive && (
        <div className="accordian-content border-t py-4 my-4">
          <div className="text-gray-500">
            <div className="fields text-md w-full block sm:grid grid-cols-2">
              <div className="field mb-2">
                First Name: {capitalizeFirstLetter(data.first_name)}
              </div>
              <div className="field mb-2">
                Last Name: {capitalizeFirstLetter(data.last_name)}
              </div>
            </div>

            <div className="fields mb-2 block sm:grid grid-cols-2">
              <div className="field">
                Email: {data.emails[0] ? data.emails[0].address : "NA"}
              </div>
              <div className="field">
                Phone: {data.phone_numbers[0] ? data.phone_numbers[0] : "NA"}
              </div>
            </div>

            <div className="field mb-2">
              LinkedIn Username: {data.linkedin_username}
            </div>

            <div className="fields block sm:grid grid-cols-2 gap-y-2">
              <div className="field">
                Job Company Name:
                {data.job_company_name ? data.job_company_name : "NA"}
              </div>
              <div className="field">
                Job Role: {data.job_title_role ? data.job_title_role : "NA"}
              </div>
              <div className="field">
                Salary: {data.inferred_salary ? data.inferred_salary : "NA"}
              </div>
            </div>

            <Link to={`/profile/${data.id}`}>
              <div className="flex justify-end">
                <a
                  href="#!"
                  className="flex external_link mt-4 py-2 px-4 rounded-full text-gray-600 hover:bg-gray-200"
                >
                  Open Full Page&nbsp;
                  <HiExternalLink size={20} />
                </a>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
