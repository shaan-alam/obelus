import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Lead } from "types";
import { spinnerDark } from "assets";
import { HiChevronDown, HiChevronLeft } from "react-icons/hi";
import {
  Accordion,
  AccordionItem,
  AccordionBody,
  AccordionHeader,
} from "react-headless-accordion";
import { v4 } from "uuid";
import { getEmails, getValueOf } from "util/";
import { useSingleLead } from "hooks";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead["_source"] | null>(null);

  const { isLoading, isFetching } = useSingleLead(id as string, setLead);

  return isLoading || isFetching ? (
    <section className="h-screen w-screen flex items-center justify-center">
      <img src={spinnerDark} />
    </section>
  ) : (
    <section>
      <div className="w-full sm:w-[75%] mx-auto">
        <div className="block_content my-8 px-8 rounded-md">
          <Link to="/search">
            <button className="bg-white flex items-center justify-between transition-all hover:bg-gray-100 border font-semibold rounded-md px-4 py-3 text-gray-600">
              <HiChevronLeft />
              Back
            </button>
          </Link>
          <h1 className="text-gray-800 font-bold text-2xl my-4">
            General Details
          </h1>
          <div className="sm:grid grid-cols-3 gap-4">
            <div className="text-gray-600 mb-2 sm:mb-0">
              Full Name: {lead?.full_name || "NA"}
            </div>
            <div className="text-gray-600 mb-2 sm:mb-0">
              Gender: {lead?.gender || "NA"}
            </div>
            <div className="text-gray-600 mb-2 sm:mb-0">
              DOB: {lead?.birth_date || "NA"}
            </div>
            <div className="text-gray-600 mb-2 sm:mb-0">
              First Name: {lead?.first_name || "NA"}
            </div>
            <div className="text-gray-600 mb-2 sm:mb-0">
              Last Name: {lead?.last_name || "NA"}
            </div>
            <div className="text-gray-600 mb-2 sm:mb-0">
              Middle Name: {lead?.middle_name || "NA"}
            </div>
          </div>
        </div>

        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">
            Contact Details
          </h1>
          <div className="sm:grid grid-cols-2">
            <div className="text-gray-600 mb-2 sm:mb-0">
              Emails:&nbsp;
              {getEmails(lead?.emails as string[])}
            </div>
            <div className="text-gray-600 mb-2 sm:mb-0">
              Phone:&nbsp;
              {lead?.phone_numbers || "NA"}
            </div>
          </div>
        </div>

        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">Socials</h1>
          <div className="sm:grid grid-cols-2 gap-4">
            <div className="col">
              <div className="text-gray-600 mb-2">
                LinkedIn Username: {lead?.linkedin_username || "NA"}
              </div>
              <div className="text-gray-600 mb-2">
                LinkedIn Connections:&nbsp;
                {lead?.linkedin_connections}
              </div>
              <div className="text-gray-600 mb-2">
                Summary: {lead?.summary || "NA"}
              </div>
            </div>
            <div className="col">
              <div className="text-gray-600 mb-2">
                Facebook Username: {lead?.facebook_username || "NA"}
              </div>
              <div className="text-gray-600 mb-2">
                GitHub Username: {lead?.github_username || "NA"}
              </div>
              <div className="text-gray-600 mb-2">
                Twitter Username: {lead?.twitter_username || "NA"}
              </div>
            </div>
          </div>
        </div>

        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">Job Details</h1>
          <div className="sm:grid grid-cols-2">
            <div className="text-gray-600 mb-2">
              Industry: {lead?.industry || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Start Date: {lead?.job_start_date || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Title: {lead?.job_title || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Title Role: {lead?.job_title_role || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Inferred Salary: {lead?.inferred_salary || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Inferred Years Experience:&nbsp;
              {lead?.inferred_years_experience || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Summary: {lead?.job_summary || "NA"}
            </div>
          </div>
        </div>

        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">
            Job Company Details
          </h1>
          <div className="md:grid grid-cols-2">
            <div className="text-gray-600 mb-2">
              Job Company Name: {lead?.job_company_name || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Size: {lead?.job_company_size || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Website:&nbsp;
              {lead?.job_company_website || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Founded:&nbsp;
              {lead?.job_company_founded || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Industry:&nbsp;
              {lead?.job_company_industry || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Location Name:&nbsp;
              {lead?.job_company_location_name || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company LinkedIn URL:&nbsp;
              {lead?.job_company_linkedin_url || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Location Postal Code:&nbsp;
              {lead?.job_company_location_postal_code || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Twitter URL:&nbsp;
              {lead?.job_company_twitter_url || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Location Country:&nbsp;
              {lead?.job_company_location_country || "NA"}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Facebook URL:&nbsp;
              {lead?.job_company_facebook_url || "NA"}
            </div>
          </div>
        </div>
        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">
            Experience Details
          </h1>
          <div className="text-gray-600 sm:grid grid-cols-2 gap-4">
            {lead?.experience.map((experience) => (
              <Accordion className="my-8" key={v4()}>
                <AccordionItem>
                  <AccordionHeader>
                    <h3 className="font-semibold text-lg flex items-center">
                      {experience.company?.name || ""}&nbsp; <HiChevronDown />
                    </h3>
                  </AccordionHeader>
                  <AccordionBody>
                    <div className="accordion-body">
                      <p className="mb-1">Title: {experience.title.name}</p>
                      <p className="mb-1">
                        Start Date: {experience.start_date || "NA"}
                      </p>
                      <p className="mb-1">
                        End Date: {experience.end_date || "NA"}
                      </p>
                      <p className="mb-1">
                        Summary: {experience.summary || "NA"}
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
          {lead?.education && lead?.education?.length > 0 ? (
            <div className="text-gray-600 sm:grid grid-cols-2 gap-4">
              {lead?.education.map((education) => (
                <Accordion className="my-8" key={v4()}>
                  <AccordionItem>
                    <AccordionHeader>
                      <h3 className="font-semibold text-lg flex items-center">
                        {education.degrees[0] || "Degree"}&nbsp;
                        <HiChevronDown />
                      </h3>
                    </AccordionHeader>
                    <AccordionBody>
                      <div className="accordion-body">
                        <p className="mb-1">School: {education.school.name}</p>
                        <p className="mb-1">
                          Degrees: {getValueOf(education.degrees)}
                        </p>
                        <p className="mb-1">
                          Start Date: {education.start_date || "NA"}
                        </p>
                        <p className="mb-1">
                          End Date: {education.end_date || "NA"}
                        </p>
                        <p className="mb-1">
                          Summary: {education.summary || "NA"}
                        </p>
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          ) : (
            <p>NA</p>
          )}
        </div>

        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">
            Location Details
          </h1>
          <div className="sm:grid grid-cols-2 gap-4">
            <div className="text-gray-600">
              Location Name: {lead?.location_name || "NA"}
            </div>
            <div className="text-gray-600">
              Location Region: {lead?.location_region || "NA"}
            </div>
            <div className="text-gray-600">
              Location Postal Code:&nbsp;
              {lead?.location_postal_code || "NA"}
            </div>
            <div className="text-gray-600">
              Location Country: {lead?.location_country || "NA"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
