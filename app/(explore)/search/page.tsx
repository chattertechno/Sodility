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
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");

  useEffect(()=>{
    setIsLoading(true)
    if(searchQuery){
      searchCreatorApi(searchQuery ? searchQuery : '', 0).then((_data)=>{
        setIsLoading(false)
        setData(_data)
      })
    }else{
      setIsLoading(false)
    }

  },[searchQuery])

 
  return (
    <main>
      <HeroSection text={searchQuery} />
      <div className="md:w-[90%] mx-auto  px-6 pt-8 -mb-10">
        <P1> {data?.length && !isLoading ? `Results (${data?.length })` : ''}</P1>
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