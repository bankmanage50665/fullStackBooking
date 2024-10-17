import React from "react";
import { Phone } from "lucide-react";

const HelplineNumber = ({ phoneNumber }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <p className="flex items-center text-gray-300">
      <Phone className="mr-2 text-indigo-400" size={18} />
      Helpline number:
      <a
        href={`tel:${phoneNumber}`}
        onClick={handleClick}
        className="ml-2 text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
      >
        {phoneNumber}
      </a>
    </p>
  );
};

export default HelplineNumber;
