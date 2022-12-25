import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getSingleLead } from "../../api";
import { Lead } from "../../types";
import spinner from "../../assets/spinner-dark.svg";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import { HiChevronDown, HiChevronLeft } from "react-icons/hi";
import { v4 } from "uuid";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Pick<Lead, "data">>();

  const getEmails = (
    emails: { address: string; type: string }[]
  ): string | undefined => {
    let results = emails?.map((email) => email.address);

    if (results?.length !== 0) {
      return results?.join(", ");
    } else {
      return "NA";
    }
  };

  const getValueOf = (str: string[] | string | undefined) => {
    if (str instanceof Array) {
      let results;
      if (str.length !== 0) {
        results = str.filter((s) => s).join(", ");
        return results;
      } else {
        return "NA";
      }
    } else if (str === "" || !str) return "NA";

    return str;
  };

  const { isLoading, isFetching } = useQuery(
    "search-id",
    () => getSingleLead(id as string),
    {
      refetchOnWindowFocus: false,
      onSuccess: (results) => {
        setLead(results.data);
        console.log(getEmails(results.data.data.emails));
      },
    }
  );

  return isLoading || isFetching ? (
    <section className="h-screen w-full flex items-center justify-center">
      <img src={spinner} alt="" className="h-8 w-8" />
    </section>
  ) : (
    <section>
      <div className="w-full sm:w-[75%] mx-auto">
        <div className="block_content my-8 px-8 rounded-md">
          <Link to="/">
            <button className="bg-white flex items-center justify-between transition-all hover:bg-gray-100 border font-semibold rounded-md px-4 py-3 text-gray-600">
              <HiChevronLeft />
              Back
            </button>
          </Link>
          <h1 className="text-gray-800 font-bold text-2xl my-4">
            General Details
          </h1>
          <div className="sm:grid grid-cols-4 gap-4">
            <div className="text-gray-600">
              Full Name: {getValueOf(lead?.data?.full_name)}
            </div>
            <div className="text-gray-600">
              First Name: {getValueOf(lead?.data.first_name)}
            </div>
            <div className="text-gray-600">
              Middle Name: {getValueOf(lead?.data.middle_name)}
            </div>
            <div className="text-gray-600">
              Last Name: {getValueOf(lead?.data.last_name)}
            </div>
            <div className="text-gray-600">
              Gender: {getValueOf(lead?.data.gender)}
            </div>
          </div>
        </div>

        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">
            Contact Details
          </h1>
          <div className="text-gray-600 mb-2">
            Emails:&nbsp;
            {getEmails(
              lead?.data.emails as { type: string; address: string }[]
            )}
          </div>
          <div className="text-gray-600 mb-2">
            Phone:&nbsp;
            {getValueOf(lead?.data.phone_numbers)}
          </div>
        </div>

        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">Socials</h1>
          <div className="sm:grid grid-cols-2 gap-4">
            <div className="text-gray-600">
              LinkedIn Username: {getValueOf(lead?.data.linkedin_username)}
            </div>
            <div className="text-gray-600">
              Facebook Username: {getValueOf(lead?.data.facebook_username)}
            </div>
            <div className="text-gray-600">
              Twitter Username: {getValueOf(lead?.data.twitter_username)}
            </div>
            <div className="text-gray-600">
              GitHub Username: {getValueOf(lead?.data.github_username)}
            </div>
          </div>
        </div>

        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">Job Details</h1>
          <div className="sm:grid grid-cols-2">
            <div className="text-gray-600 mb-2">
              Industry: {getValueOf(lead?.data.industry)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Title: {getValueOf(lead?.data.job_title)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Title Role: {getValueOf(lead?.data.job_title_role)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company ID: {getValueOf(lead?.data.job_company_id)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Name: {getValueOf(lead?.data.job_company_name)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Website: {getValueOf(lead?.data.job_company_website)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Size: {getValueOf(lead?.data.job_company_size)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Founded: {getValueOf(lead?.data.job_company_founded)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Industry:{" "}
              {getValueOf(lead?.data.job_company_industry)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company LinkedIn URL:{" "}
              {getValueOf(lead?.data.job_company_linkedin_url)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Location Name:{" "}
              {getValueOf(lead?.data.job_company_location_name)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Location country:{" "}
              {getValueOf(lead?.data.job_company_location_country)}
            </div>
            <div className="text-gray-600 mb-2">
              LinkedIn Connections:{" "}
              {getValueOf(lead?.data.linkedin_connections)}
            </div>
            <div className="text-gray-600 mb-2">
              Inferred Salary: {getValueOf(lead?.data.inferred_salary)}
            </div>
            <div className="text-gray-600 mb-2">
              Summary: {getValueOf(lead?.data.summary)}
            </div>
          </div>
        </div>

        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">
            Location Details
          </h1>
          <div className="sm:grid grid-cols-2 gap-4">
            <div className="text-gray-600">
              Location Name: {getValueOf(lead?.data.location_name)}
            </div>
            <div className="text-gray-600">
              Location Country: {getValueOf(lead?.data.location_country)}
            </div>
            <div className="text-gray-600">
              Location Postal Code:{" "}
              {getValueOf(lead?.data.location_postal_code)}
            </div>
            <div className="text-gray-600">
              Location Geo: {getValueOf(lead?.data.location_geo)}
            </div>
            <div className="text-gray-600">
              Location Country: {getValueOf(lead?.data.location_country)}
            </div>
          </div>
        </div>

        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">
            Experience Details
          </h1>
          <div className="text-gray-600 sm:grid grid-cols-2 gap-4">
            {lead?.data.experience.map((experience) => (
              <Accordion className="my-8" key={v4()}>
                <AccordionItem>
                  <AccordionHeader>
                    <h3 className="font-semibold text-lg flex items-center">
                      {experience.company.name}&nbsp; <HiChevronDown />
                    </h3>
                  </AccordionHeader>
                  <AccordionBody>
                    <div className="accordion-body">
                      <p className="mb-1">Title: {experience.title.name}</p>
                      <p className="mb-1">
                        Start Date: {getValueOf(experience.start_date)}
                      </p>
                      <p className="mb-1">
                        End Date: {getValueOf(experience.end_date)}
                      </p>
                      <p className="mb-1">
                        Summary: {getValueOf(experience.summary)}
                      </p>
                    </div>
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>

        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">
            Education Details
          </h1>
          <div className="text-gray-600 sm:grid grid-cols-2 gap-4">
            {lead?.data.education.map((education) => (
              <Accordion className="my-8">
                <AccordionItem>
                  <AccordionHeader>
                    <h3 className="font-semibold text-lg flex items-center">
                      {education.school.name}&nbsp; <HiChevronDown />
                    </h3>
                  </AccordionHeader>
                  <AccordionBody>
                    <div className="accordion-body">
                      <p className="mb-1">
                        Institution Type: {education.school.type}
                      </p>
                      <p className="mb-1">
                        Degrees: {getValueOf(education.degrees)}
                      </p>
                      <p className="mb-1">
                        Majors: {getValueOf(education.majors)}
                      </p>
                      <p className="mb-1">
                        Minors: {getValueOf(education.minors)}
                      </p>
                      <p className="mb-1">End Date: {education.end_date}</p>
                    </div>
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
