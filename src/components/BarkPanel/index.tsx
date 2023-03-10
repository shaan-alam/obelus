import { useState } from "react";
import { HiPhone, HiMail, HiCheck } from "react-icons/hi";
import classnames from "classnames";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { BarkLead } from "pages/Bark/types";
import { decodeToHTML, getEmails } from "util/";
import { useSingleBarkData } from "hooks";

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
  const [lead, setLead] = useState<BarkLead | null>(null);

  const { isLoading, isFetching } = useSingleBarkData(id as string, setLead);

  return (
    <div className="flex">
      <div className="h-screen overflow-y-auto py-12 px-8 w-1/2">
        <h1 className="text-gray-800 text-2xl mb-2 font-bold flex items-center justify-between">
          {isFetching ? <Skeleton width={100} /> : lead?.buyer_share_name}
          {isFetching ? (
            <Skeleton width={50} />
          ) : (
            <span className="text-sm text-gray-500">
              {new Date(lead?.since as any).toLocaleDateString() || "NA"}
            </span>
          )}
        </h1>
        <div className="my-3">
          <h5 className="text-gray-800">
            {isFetching ? <Skeleton width={120} /> : lead?.project_title}
          </h5>
          <h5 className="text-gray-800">
            {isFetching ? (
              <Skeleton width={150} />
            ) : (
              `${lead?.city_string} ${lead?.bark_country_name}`
            )}
          </h5>
        </div>
        <div className="my-3">
          {!isFetching ? (
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
            <Skeleton width={200} />
          )}
          {!isFetching ? (
            <h5 className="text-gray-800 flex items-center">
              <HiMail />
              &nbsp; {lead?.buyer_email}
            </h5>
          ) : (
            <Skeleton width={200} />
          )}
        </div>
        {isFetching ? (
          <Skeleton width={300} height={30} />
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
        {!isFetching ? (
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
            <Skeleton height={35} width={300} className="my-4" />
            <Skeleton height={35} width={400} className="my-4" />
            <Skeleton height={35} width={300} className="my-4" />
            <Skeleton height={35} width={400} className="my-4" />
            <Skeleton height={35} width={300} className="my-4" />
            <Skeleton height={35} width={400} className="my-4" />
          </>
        )}
      </div>
      <div className="w-1/2 py-12 px-8 border-l">
        <h1 className="text-gray-800 text-2xl mb-2 font-bold">
          {!isFetching && "Matches"}
        </h1>
        {!isFetching && lead?.matches.length === 0 && (
          <div className="bg-red-200 text-red-600 py-6 rounded-md text-center font-bold">
            No matches found!
          </div>
        )}
        {isLoading || isFetching ? (
          <Skeleton height={100} count={4} className="my-4" />
        ) : (
          <>
            {lead?.matches.map((match) => (
              <div className="p-4 bg-gray-100 rounded-md my-4">
                <div className="">
                  <div className="field mb-2 text-gray-600">
                    Full Name: {match._source.full_name || "NA"}
                  </div>
                  <div className="field mb-2 text-gray-600">
                    Address: {match._source.location_name || "NA"}
                  </div>
                  <div className="field mb-2 text-gray-600">
                    Email: {getEmails(match._source.emails) || "NA"}
                  </div>
                  <div className="field mb-2 text-gray-600">
                    Phone:&nbsp;
                    {/* {match._source.phone_numbers.map((phone) => (
                      <span>phone</span>
                    )) || "NA"} */}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BarkPanel;
