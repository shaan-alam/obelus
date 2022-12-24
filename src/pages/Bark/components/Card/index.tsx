import { HiLocationMarker,  } from "react-icons/hi";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { BarkLead } from "../../types";
import { decodeToHTML } from "../../../../util";

interface IProps {
  lead: BarkLead;
  isActive: boolean;
  onClick: () => void;
}

const Card = ({ lead, isActive, onClick }: IProps) => {
  return (
    <Link to={`/bark/${lead.project_id}`}>
      <div
        className={classnames(
          "border-t px-8 py-4 hover:bg-gray-100 cursor-pointer transition-all",
          isActive ? "bg-gray-100 border-l-blue-800 border-l-4 pl-10" : ""
        )}
        onClick={onClick}
      >
        <h1 className="text-black font-semibold text-xl">
          {lead.buyer_share_name}
        </h1>
        <h6 className="text-gray-500 mb-4">{lead.project_title}</h6>
        <h6 className="text-gray-500 mb-2 flex items-center">
          <HiLocationMarker />
          &nbsp;{lead.city_string}, {lead.bark_country_name}
        </h6>
        <h6 className="text-gray-500 mb-2">{decodeToHTML(lead.summary)}</h6>
      </div>
    </Link>
  );
};

export default Card;
