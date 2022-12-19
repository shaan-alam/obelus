interface ICard {
  first_name: string;
  last_name: string;
  email: string;
  linkedin_username: string;
}

const Card = ({ card }: { card: ICard }) => {
  return (
    <div className="my-6 sm:my-0 cursor-pointer card bg-white rounded-md hover:shadow-lg py-6 px-8 border">
      <ul>
        <li className="font-semibold text-gray-800">
          First Name:&nbsp;
          <span className="text-black font-normal">{card.first_name}</span>
        </li>
        <li className="font-semibold text-gray-800">
          Last Name:&nbsp;
          <span className="text-black font-normal">{card.last_name}</span>
        </li>
        <li className="font-semibold text-gray-800">
          Email:&nbsp;{" "}
          <span className="text-black font-normal">{card.email}</span>
        </li>
        <li className="font-semibold text-gray-800">
          LinkedIn Username:&nbsp;
          <span className="text-black font-normal">
            {card.linkedin_username}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Card;
