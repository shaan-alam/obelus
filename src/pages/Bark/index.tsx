import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { getBarkData } from "api";
import Card from "./components/Card";
import { BarkLead } from "./types";
import Skeleton from "react-loading-skeleton";
import "./Bark.css";

const Bark = () => {
  const [activeID, setActive] = useState(0);
  const [leads, setLeads] = useState<BarkLead[]>();

  const { isLoading, isFetching } = useQuery(
    ["bark-data"],
    () => getBarkData(),
    {
      onSuccess: (results) => {
        setLeads([...results.data]);
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <section>
      <div className="flex">
        <div className="sidebar w-[33.33%] h-screen overflow-y-auto border-r">
          <ul>
            {isLoading || isFetching ? (
              <Skeleton height={200} count={5} />
            ) : (
              <li>
                {leads?.map((lead) => (
                  <Card
                    lead={lead}
                    isActive={lead.project_id === activeID}
                    onClick={() => setActive(lead.project_id)}
                  />
                ))}
              </li>
            )}
          </ul>
        </div>
        <div className="main-panel-container w-[67%]">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Bark;
