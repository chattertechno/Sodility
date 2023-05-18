"use client"
// COMPONENTS
import { H1, P1 } from "@/components/typography";

// ASSETS
import { CreatorsListSection } from "@/components/pages/explore";
import { useEffect, useState } from "react";
import { getCreatorByCategoryApi } from "@/http/creatorApi";
import { categories } from "@/staticData";

// ======================================================
// WRITERS AND JOURNALIST PAGE COMPONENT ================
// ======================================================
export default function WriterAndJournalistPage({ params }:any) {
  const {category}= params;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  useEffect(()=>{
    getCreatorByCategoryApi(category||"").then((_data) => {
      setData(_data);
      setIsLoading(false);
    });
  },[category])

  if(isLoading) return<div className="flex justify-center items-center h-96">
      <>loading...</>
    </div>
  
  return (
    <main>
      <HeroSection category={category} />
      <CreatorsListSection list={data} />
    </main>
  );
}

// EXTENDED COMPONENTS =================================
const HeroSection = ({category}:any) => {
  return (
    <section className="bg-primaryGradient py-16">
      <div className="md:w-[90%] mx-auto  px-6 flex flex-col items-center">
        {/* top - heading  */}
        <div className=" w-full space-y-3">
          <H1 className="text-secondary">{categories?.find((itm:any)=>(itm.key==category))?.value||""}</H1>
          <P1>
            From edge-of-your-chair fiction to deep investigative journalism,
            Sodality is <br /> welcome to all, have a browse below of our
            writers & journalists.
          </P1>
        </div>
      </div>
    </section>
  );
};