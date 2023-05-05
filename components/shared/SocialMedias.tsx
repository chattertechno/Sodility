"use client";

import { FaDiscord, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const SocialMedias = ({facebook,twitter,youtube }:any) => {
  return (
    <div className="flex space-x-4 mt-4">
      <a
        className="text-appGray-500 hover:text-blue-600 "
        href={facebook||"#"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookF className="w-5 h-5" />
      </a>
      <a
        className="text-appGray-500 hover:text-blue-400 "
        href={twitter||"#"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTwitter className="w-5 h-5" />
      </a>
      <a
        className="text-appGray-500 hover:text-blue-600 "
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaDiscord className="w-5 h-5" />
      </a>
      <a
        className="text-appGray-500 hover:text-red-600 "
        href={youtube||"#"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube className="w-5 h-5" />
      </a>
    </div>
  );
};

export default SocialMedias;
