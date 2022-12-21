import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSingleLead } from "../../api";
import { Lead } from "../../types";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Pick<Lead, "data">>();

  const getValueOf = (str: string | undefined) => {
    if (str === "" || !str) return "NA";
    return str;
  };

  const { isLoading, isFetching, isFetched, isError } = useQuery(
    "search-id",
    () => getSingleLead(id as string),
    {
      onSuccess: (results) => {
        setLead(results.data);
      },
    }
  );

  return isLoading || isFetching ? (
    <section className="h-screen w-full flex items-center justify-center">
      <h1 className="text-3xl">LOADING</h1>
    </section>
  ) : (
    <section>
      <div className="w-[70%] mx-auto">
        <div className="block_content my-8 px-8 rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl my-4">
            General Details
          </h1>
          <div className="grid grid-cols-4 gap-4">
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
          <h1 className="text-gray-800 font-bold text-2xl my-4">Socials</h1>
          <div className="grid grid-cols-2 gap-4">
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
            Job Company Industry: {getValueOf(lead?.data.job_company_industry)}
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
            Job Company Summary: {getValueOf(lead?.data.job_summary)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
