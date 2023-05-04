"use client"
import { CreatorsListSection } from "@/components/pages/explore";
import { H1, P1 } from "@/components/typography";
import { useRouter,useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchCreatorApi } from "../../../http/creatorApi";

// ======================================================
// SEARCH CREATORS PAGE COMPONENT =======================
// ======================================================
export default function SearchCreatorsPage() {
  const searchParams = useSearchParams();
const searchQuery = searchParams.get('key');
const [data, setData] = useState([])
const [isLoading, setIsLoading] = useState(false)
useEffect(()=>{
  console.log(searchQuery)
  setIsLoading(true)
  if(searchQuery){
    searchCreatorApi(searchQuery||"").then((_data)=>{
      console.log(_data)
      setIsLoading(false)
      setData(_data)
    })
  }else{
    setIsLoading(false)
  }

},[searchQuery])
 if(isLoading) return <div className="flex flex-col items-center rounded border border-appGray-450 hover:shadow-sm py-10"> loadding </div>
  return (
    <main>
      <HeroSection />
      <div className="md:w-[90%] mx-auto  px-6 pt-8 -mb-10">
        <P1>Results {`(${data?.length})`}</P1>
      </div>
      <CreatorsListSection list={data} pagination={false} />
    </main>
  );
}

// EXTENDED COMPONENTS =================================
const HeroSection = () => {
  return (
    <section className="bg-primaryGradient py-16">
      <div className="md:w-[90%] mx-auto  px-6 flex flex-col items-center">
        {/* top - heading  */}
        <div className=" w-full space-y-3">
          <H1 className="text-secondary">Search: {"placeholder"}</H1>
        </div>
      </div>
    </section>
  );
};