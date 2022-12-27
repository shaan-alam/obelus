import classnames from "classnames";
import { useState, useEffect } from "react";
import { HiPhone, HiMail, HiCheck } from "react-icons/hi";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSingleBarkData } from "../../api";
import { BarkLead } from "../../pages/Bark/types";
import { decodeToHTML } from "../../util";
import Skeleton from "react-loading-skeleton";

const ResponseDisplay = ({
  count,
  cap,
}: {
  count: number | undefined;
  cap: number | undefined;
}) => {
  return (
    <div className="flex justify-between w-[100px]">
      {new Array(cap).fill(1, 0, cap).map((res, index) => (
        <span
          className={classnames(
            "h-5 w-3 mr-1",
            index < (count as number) ? "bg-emerald-500" : "bg-gray-300"
          )}
        ></span>
      ))}
    </div>
  );
};

const BarkPanel = () => {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<BarkLead>();

  const { isLoading, isFetching, refetch } = useQuery(
    ["bark-single-lead", id],
    () => getSingleBarkData(id as string),
    {
      onSuccess: (result) => {
        setLead(result.data);
      },
    }
  );

  return (
    <div className="flex">
      <div className="h-screen overflow-y-auto py-12 px-8 w-1/2">
        <h1 className="text-gray-800 text-2xl mb-2 font-bold">
          {lead?.buyer_share_name || <Skeleton />}
        </h1>
        <div className="my-3">
          <h5 className="text-gray-800">{lead?.project_title}</h5>
          <h5 className="text-gray-800">
            {lead?.city_string || <Skeleton />},{" "}
            {lead?.bark_country_name || <Skeleton />}
          </h5>
        </div>
        <div className="my-3">
          {lead?.buyer_telephone ? (
            <h5 className="text-gray-800 flex items-center">
              <HiPhone />
              &nbsp; {lead?.buyer_telephone}
              {lead?.is_buyer_phone_verified && (
                <span className="ml-2 bg-emerald-100 p-1 text-sm font-semibold text-emerald-400 rounded-md flex items-center">
                  <HiCheck />
                  &nbsp; Verified
                </span>
              )}
            </h5>
          ) : (
            <Skeleton />
          )}
          {lead?.buyer_email ? (
            <h5 className="text-gray-800 flex items-center">
              <HiMail />
              &nbsp; {lead?.buyer_email}
            </h5>
          ) : (
            <Skeleton />
          )}
        </div>
        {!lead?.response_count ? (
          <Skeleton />
        ) : (
          lead?.response_count !== 0 &&
          lead?.response_cap !== 0 && (
            <div className="rounded-lg my-6 w-[400px] bg-gray-100 p-4 flex text-gray-800 items-center font-semibold">
              <ResponseDisplay
                cap={lead?.response_cap}
                count={lead?.response_count}
              />
              &nbsp;
              {lead?.response_count}/{lead?.response_cap} professionals have
              responded
            </div>
          )
        )}
        {lead?.custom_fields ? (
          <div className="my-8">
            <h1 className="font-bold text-lg">Details</h1>
            {lead?.custom_fields.map((field) => (
              <div className="my-6">
                <h1 className="text-gray-800 mb-2 font-bold">
                  {field.question}
                </h1>
                <p className="text-gray-600">
                  {decodeToHTML(field.answer) || "NA"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <Skeleton height={50} width={700} count={5} />
          </>
        )}
      </div>
      <div className="w-1/2 py-12 px-8 border-l">
        <h1 className="text-gray-800 text-2xl mb-2 font-bold">Matches</h1>
        {!lead?.matches.length && (
          <div className="bg-red-200 text-red-600 py-6 rounded-md text-center font-bold">
            No matches found!
          </div>
        )}
        {lead?.matches.map((match) => (
          <div className="p-4 bg-gray-100 rounded-md my-4">
            <div className="grid grid-cols-2">
              <div className="field mb-2 text-gray-600">
                Full Name: {match.data.full_name || "NA"}
              </div>
              <div className="field mb-2 text-gray-600">
                Address: {match.data.location_street_address || "NA"}
              </div>
              <div className="field mb-2 text-gray-600">
                Email: {match.data.work_email || "NA"}
              </div>
              <div className="field mb-2 text-gray-600">
                Phone: {match.data.mobile_phone || "NA"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarkPanel;
