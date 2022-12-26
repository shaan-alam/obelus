import { HiChevronDown, HiExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Lead } from "../../types";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import classNames from "classnames";


const Card = ({ card }: { card: Lead }) => {
  const { data } = card;
  const capitalizeFirstLetter = (str: string) => {
    return str !== null ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  return (
    <div className="flex items-center w-full">
      <label htmlFor="checkbox"></label>
      <Accordion className="w-full ml-4">
        <AccordionItem>
          {({ open }: { open: boolean }) => (
            <div
              className={classNames(
                "my-6 card bg-white rounded-md py-6 px-8 border"
              )}
            >
              <AccordionHeader className="w-full">
                <div className="accordian-body flex items-center justify-between w-full pb-4">
                  <ul className="text-black text-left">
                    <li className="mb-2 font-bold text-xl">
                      {capitalizeFirstLetter(data?.first_name)}&nbsp;
                      {capitalizeFirstLetter(data?.last_name)}
                    </li>
                    <li className="font-medium">
                      Email:&nbsp;
                      <span className="text-black font-normal">
                        {data.emails[0]?.address || "NA"}
                      </span>
                    </li>
                    <li className="font-medium">
                      LinkedIn URL:&nbsp;
                      <a
                        className="text-blue-500 underline"
                        href={
                          data.linkedin_url.startsWith("http")
                            ? data.linkedin_url
                            : `https://${data.linkedin_url}`
                        }
                        rel="noreferrer"
                        target="_blank"
                      >
                        {data.linkedin_url.startsWith("http")
                          ? data.linkedin_url
                          : `https://${data.linkedin_url}`}
                      </a>
                    </li>
                    <li className="font-medium">
                      Phone:&nbsp;
                      <span className="text-black font-normal">
                        {data.phone_numbers[0] || "NA"}
                      </span>
                    </li>
                  </ul>
                  <a href="#!">
                    <HiChevronDown
                      size={25}
                      className={`rounded-full text-gray-600 transition-all ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </a>
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div className="accordian-content py-4 my-4 border-t">
                  <div className="text-gray-500 sm:grid grid-cols-2">
                    <div className="mb-2">
                      Gender: {capitalizeFirstLetter(data.gender)}
                    </div>
                    <div className="mb-2">
                      Job Company Name:&nbsp;
                      {capitalizeFirstLetter(data.job_company_name) || "NA"}
                    </div>
                    <div className="mb-2">
                      Job Title: {capitalizeFirstLetter(data.job_title)}
                    </div>
                    <div className="mb-2">
                      Job Role:&nbsp;
                      {capitalizeFirstLetter(data?.job_title_role) || "NA"}
                    </div>
                    <div className="mb-2">
                      Inferred Salary: {data.inferred_salary || "NA"}
                    </div>
                  </div>
                  <div className="text-gray-500 sm:grid grid-cols-2">
                    <div className="mb-2">
                      LinkedIn Connections: {data.linkedin_connections || "NA"}
                    </div>
                    <div className="mb-2">
                      Twitter Username: {data.twitter_username || "NA"}
                    </div>
                    <div className="mb-2">
                      Facebook Username:&nbsp;
                      {capitalizeFirstLetter(data.facebook_username) || "NA"}
                    </div>
                    <div className="mb-2">
                      GitHub Username:{" "}
                      {capitalizeFirstLetter(data?.github_username) || "NA"}
                    </div>
                    <div className="mb-2">
                      Country: {data.countries[0] ? data.countries[0] : "NA"}
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
              </AccordionBody>
            </div>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Card;
