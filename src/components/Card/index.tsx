import { useState } from "react";
import { HiChevronDown, HiExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Lead } from "../../types";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";

const Card = ({ card: { data } }: { card: Lead }) => {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Accordion>
      <AccordionItem>
        {({ open }: { open: boolean }) => (
          <div className="my-6 card bg-white rounded-md py-6 px-8 border">
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
                <a href="#!">
                  <HiChevronDown
                    size={40}
                    className={`p-2 text-gray-600 rounded-full hover:bg-gray-200 transition-all ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </a>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <div className="accordian-content py-4 my-4 border-t">
                <div className="text-gray-500">
                  <div className="fields text-md w-full block sm:grid grid-cols-2">
                    <div className="field mb-2">
                      Gender: {capitalizeFirstLetter(data.gender)}
                    </div>
                    <div className="field mb-2">
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
                    </div>
                  </div>

                  <div className="fields mb-2 block sm:grid grid-cols-2">
                    <div className="field">
                      Countries: {data.countries[0] ? data.countries[0] : "NA"}
                    </div>
                    <div className="field">
                      Phone:{" "}
                      {data.phone_numbers[0] ? data.phone_numbers[0] : "NA"}
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
                      Job Role:{" "}
                      {data.job_title_role ? data.job_title_role : "NA"}
                    </div>
                    <div className="field">
                      Salary:{" "}
                      {data.inferred_salary ? data.inferred_salary : "NA"}
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
            </AccordionBody>
          </div>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default Card;
