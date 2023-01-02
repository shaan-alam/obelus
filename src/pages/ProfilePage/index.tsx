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
import useSingleLead from "hooks/useSingleLead";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Pick<Lead, "data"> | null>(null);

  const { isLoading, isFetching } = useSingleLead(id as string, setLead);

  return isLoading || isFetching ? (
    <section className="h-screen w-screen flex items-center justify-center">
      <img src={spinnerDark} />
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
          <div className="sm:grid grid-cols-3 gap-4">
            <div className="text-gray-600 mb-2 sm:mb-0">
              Full Name: {getValueOf(lead?.data?.full_name)}
            </div>
            <div className="text-gray-600 mb-2 sm:mb-0">
              Gender: {getValueOf(lead?.data.gender)}
            </div>
            <div className="text-gray-600 mb-2 sm:mb-0">
              DOB: {getValueOf(lead?.data.birth_date)}
            </div>
            <div className="text-gray-600 mb-2 sm:mb-0">
              First Name: {getValueOf(lead?.data.first_name)}
            </div>
            <div className="text-gray-600 mb-2 sm:mb-0">
              Last Name: {getValueOf(lead?.data.last_name)}
            </div>
            <div className="text-gray-600 mb-2 sm:mb-0">
              Middle Name: {getValueOf(lead?.data.middle_name)}
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
              {getEmails(
                lead?.data.emails as { type: string; address: string }[]
              )}
            </div>
            <div className="text-gray-600 mb-2 sm:mb-0">
              Phone:&nbsp;
              {getValueOf(lead?.data.phone_numbers)}
            </div>
          </div>
        </div>

        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">Socials</h1>
          <div className="sm:grid grid-cols-2 gap-4">
            <div className="col">
              <div className="text-gray-600 mb-2">
                LinkedIn Username: {getValueOf(lead?.data.linkedin_username)}
              </div>
              <div className="text-gray-600 mb-2">
                LinkedIn Connections:&nbsp;
                {getValueOf(lead?.data.linkedin_connections)}
              </div>
              <div className="text-gray-600 mb-2">
                Summary: {getValueOf(lead?.data.summary)}
              </div>
            </div>
            <div className="col">
              <div className="text-gray-600 mb-2">
                Facebook Username: {getValueOf(lead?.data.facebook_username)}
              </div>
              <div className="text-gray-600 mb-2">
                GitHub Username: {getValueOf(lead?.data.github_username)}
              </div>
              <div className="text-gray-600 mb-2">
                Twitter Username: {getValueOf(lead?.data.twitter_username)}
              </div>
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
              Job Start Date: {getValueOf(lead?.data.job_start_date)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Title: {getValueOf(lead?.data.job_title)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Title Role: {getValueOf(lead?.data.job_title_role)}
            </div>
            <div className="text-gray-600 mb-2">
              Inferred Salary: {getValueOf(lead?.data.inferred_salary)}
            </div>
            <div className="text-gray-600 mb-2">
              Inferred Years Experience:{" "}
              {getValueOf(lead?.data.inferred_years_experience)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Summary: {getValueOf(lead?.data.job_summary)}
            </div>
          </div>
        </div>

        <div className="block_content my-4 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">
            Job Company Details
          </h1>
          <div className="md:grid grid-cols-2">
            <div className="text-gray-600 mb-2">
              Job Company Name: {getValueOf(lead?.data.job_company_name)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Size: {getValueOf(lead?.data.job_company_size)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Website: {getValueOf(lead?.data.job_company_website)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Founded: {getValueOf(lead?.data.job_company_founded)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Industry:&nbsp;
              {getValueOf(lead?.data.job_company_industry)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Location Name:&nbsp;
              {getValueOf(lead?.data.job_company_location_name)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company LinkedIn URL:&nbsp;
              {getValueOf(lead?.data.job_company_linkedin_url)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Location Postal Code:&nbsp;
              {getValueOf(lead?.data.job_company_location_postal_code)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Twitter URL:&nbsp;
              {getValueOf(lead?.data.job_company_twitter_url)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Location Country:&nbsp;
              {getValueOf(lead?.data.job_company_location_country)}
            </div>
            <div className="text-gray-600 mb-2">
              Job Company Facebook URL:&nbsp;
              {getValueOf(lead?.data.job_company_facebook_url)}
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
                      {experience.company?.name || ""}&nbsp; <HiChevronDown />
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
            Location Details
          </h1>
          <div className="sm:grid grid-cols-2 gap-4">
            <div className="text-gray-600">
              Location Name: {getValueOf(lead?.data.location_name)}
            </div>
            <div className="text-gray-600">
              Location Region: {getValueOf(lead?.data.location_region)}
            </div>
            <div className="text-gray-600">
              Location Postal Code:&nbsp;
              {getValueOf(lead?.data.location_postal_code)}
            </div>
            <div className="text-gray-600">
              Location Country: {getValueOf(lead?.data.location_country)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
