"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Components
import { P1 } from "../typography";
import DropDown from "./DropDown";
import { debounce } from 'lodash';
import { searchCreatorApi } from "../../http/creatorApi";

// ASSETS
import userImgPlaceholder from "../../assets/avatar.png";
import { useRouter } from "next/navigation";
import { getRedirectRouteByRole } from "@/helper/roleHelper";
import { Loaders } from "@/ui-kits/Loaders";

// ===========================================
// SEARCH INPUT COMPONENT ====================
// ===========================================
const SearchInput = () => {
  const   route = useRouter()
  const [search, setSearch] = useState<string>("");
  const searchParams = useSearchParams();
  const searchQuery: any = searchParams.get("query");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [dropDownActive, setDropDownActive] = useState(false);
  const [noData, setNoData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delayedSearch = debounce(() => {
      if (search) {
        searchCreatorApi(search, 10).then((data:any)=>{
          if(data){
            setSearchResults(data.slice(0,6))
            setIsLoading(false)
          }else{
            setSearchResults([])
            setNoData("No Search Results Found")
            setIsLoading(false)
          }
        })
      }
    }, 500);

    delayedSearch();
    return delayedSearch.cancel;
  }, [search]);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsLoading(true)
    setDropDownActive(true);
  };
  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      // Handle the Enter key press event here
      setDropDownActive(false)
      route.push(`/search?query=${search}`)
    }
  };

  const bebouncingBlur = debounce(()=>setDropDownActive(false),500)
 

  const handleFocus = (event:any) => {
    setDropDownActive(true);
  };

  return (
    <div className="relative ">
      <input
        className="p-2.5 text-base pl-10 md:w-80 w-full rounded-md border border-appGray-400 relative hover:shadow-sm focus:outline-none focus:border focus:border-[#a0bbdb]"
        type="text"
        id="search"
        placeholder="Search Creators"
        value={search}
        onChange={handleSearch}
        onBlur={_ => bebouncingBlur()}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
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
      {(dropDownActive && search.length>1) && (
        <DropDown
          parentPositionAndPadding="top-14 left-0"
          arrowPosition="-top-2 left-8"
        >

      { isLoading ? <div className="flex flex-col  rounded border border-appGray-450 hover:shadow-sm text-center py-10"> Loading ... </div>:
          <ul className="pt-4 bg-white relative flex flex-col justify-between">
           {searchResults.length > 0 && searchResults.map((itm, index)=>{
           return (
          
           <div key={itm._id} className="py-2 px-5 hover:bg-blue-200 ">
              <SearchItem
                name={itm.username}
                username={itm.username||""}
                img={itm.avatar}
                // link={`/creator?key=${itm._id}`}
                link={getRedirectRouteByRole(itm._id)}
              />
            </div>
            )

           })} 

           {searchResults.length > 5 && !isLoading && <div onClick={() => route.push(`/search?query=${search}`)} className="w-full flex pb-3 justify-center items-center cursor-pointer hover:text-blue-500">See all results</div>}


           {searchResults.length === 0 && <li className="px-5 mb-3">{search ? noData : "You haven't searched anything."}</li>}
            
          </ul>}
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
      <div>
        <Image
          src={img|| userImgPlaceholder}
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