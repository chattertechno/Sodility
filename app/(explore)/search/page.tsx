"use client"
// COMPONENTS
import { CreatorsListSection } from "@/components/pages/explore";
import { H1, P1 } from "@/components/typography";
import { SearchInput, Button } from "../../../components/shared";
import { useState } from "react";
import { searchContentApi } from "../../../http/contentApi";

// ======================================================
// SEARCH CREATORS PAGE COMPONENT =======================
// ======================================================
export default function SearchCreatorsPage() {
  const [isLoading, setLoading] = useState(false)
  const [search, setSearch] = useState<string>("");
  const [list,setList] = useState<any>([1,2,3])
  const handleSubmit = ()=>{
    console.log(search)
    searchContentApi(search).then((data)=>{
      if(!data){
        setList([])
      }else{
        setList(data)
      }
    })

  }
  console.log(search,"popopopp")
  if(isLoading) return <div className="flex flex-col items-center rounded border border-appGray-450 hover:shadow-sm py-10"> loadding </div>
  return (
    <main>
      <HeroSection handleSubmit={handleSubmit} search={search} setSearch={setSearch} />
      <div className="md:w-[90%] mx-auto  px-6 pt-8 -mb-10">
        <P1>Results {`(${list.length})`}</P1>
      </div>
      <CreatorsListSection list={list} pagination={false} />
    </main>
  );
}

// EXTENDED COMPONENTS =================================
const HeroSection = (props:any) => {
  const {search, setSearch, handleSubmit} = props
  
  return (
    <section className="bg-primaryGradient py-16">
      <div className="md:w-[90%] mx-auto  px-6 flex flex-col items-center">
        {/* top - heading  */}
        <div className=" w-full space-y-3">
        <div className="flex items-center">
        <SearchInput 
          placeholder="Search Content"
          setSearch ={setSearch}
          search={search}
        />
        <button type="button" 
        onClick={handleSubmit}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center">Search</button>
        </div>
        </div>
      </div>
    </section>
  );
};
