"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";

// Components
import { P1 } from "../typography";
import DropDown from "./DropDown";

// ASSETS
import userImgPlaceholder from "../../assets/index/avatar.png";

// ===========================================
// SEARCH INPUT COMPONENT ====================
// ===========================================
const SearchInput = (props:any) => {
  const {setSearch,search,placeholder} = props
  // const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [dropDownActive, setDropDownActive] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // setDropDownActive(true);
  };

  return (
    <div className="relative ">
      <input
        className="p-2.5 text-base pl-10 md:w-80 w-full rounded-md border border-appGray-400 relative hover:shadow-sm focus:outline-none focus:border focus:border-[#a0bbdb]"
        type="text"
        placeholder={placeholder?placeholder:"Search Creators"}
        value={search}
        onChange={handleSearch}
        onBlur={_ => setDropDownActive(false)}
      />
      <svg
        className="h-5 w-5 text-[#a0bbdb] absolute top-3 left-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {dropDownActive && (
        <DropDown
          parentPositionAndPadding="top-14 left-0 p-2"
          arrowPosition="-top-2 left-8"
        >
          <ul className="p-3 pt-4 bg-white relative flex justify-between">
            <div>
              <SearchItem
                name="John Doe"
                username="johndoe"
                img={userImgPlaceholder}
                link="/"
              />
            </div>
          </ul>
        </DropDown>
      )}
    </div>
  );
};

// Extended Components
const SearchItem = ({
  name,
  username,
  img,
  link,
}: {
  name: string;
  username: string;
  img: StaticImageData;
  link: string;
}) => {
  return (
    <Link href={link} className="flex gap-3">
      <div className="">
        <Image
          src={img}
          alt={name + " image"}
          className="rounded-full"
          width={50}
          height={50}
        />
      </div>

      <div className="flex flex-col justify-center hover:bg-appGray-100">
        <P1 className="text-sm font-semibold ">{name}</P1>
        <li className="text-[10px] font-semibold ">@{username}</li>
      </div>
    </Link>
  );
};

export default SearchInput;
