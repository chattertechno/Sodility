"use client"
import { CreatorsListSection } from "@/components/pages/explore";
import { H1, P1 } from "@/components/typography";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchCreatorApi } from "../../../http/creatorApi";
import { Loaders } from "@/ui-kits/Loaders";

// ======================================================
// SEARCH CREATORS PAGE COMPONENT =======================
// ======================================================
export default function SearchCreatorsPage() {
  
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const searchInput = typeof document !== "undefined"?document.getElementById("search"):null as any | null;
  const searchValue = searchInput&&searchInput?.value;
  
  console.log(searchValue);
  useEffect(()=>{
    setIsLoading(true)
    if(searchValue){
      searchCreatorApi(searchValue ? searchValue : '', 0).then((_data)=>{
        setIsLoading(false)
        setData(_data)
      })
    }else{
      setIsLoading(false)
    }

  },[searchValue])

 
  return (
    <main>
      <HeroSection text={searchValue} />
      <div className="md:w-[90%] mx-auto  px-6 pt-8 -mb-10">
        <P1>Results {`(${data?.length ? data?.length : 0})`}</P1>
      </div>
      {isLoading ? <div className="flex flex-col items-center rounded border border-appGray-450 hover:shadow-sm py-10"> <Loaders /> </div>
       :<CreatorsListSection list={data} pagination={false} />}
    </main>
  );
}

// EXTENDED COMPONENTS =================================
const HeroSection = ({text}: any) => {
  return (
    <section className="bg-primaryGradient py-16">
      <div className="md:w-[90%] mx-auto  px-6 flex flex-col items-center">
        {/* top - heading  */}
        <div className=" w-full space-y-3">
          <H1 className="text-secondary">Search: {`${text ? text : "No Search Results Found"}`}</H1>
        </div>
      </div>
    </section>
  );
};