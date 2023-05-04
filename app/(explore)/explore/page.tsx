import React from "react";
// COMPONENTS
import { CreatorsListSection } from "@/components/pages/explore";
import { H1, P1 } from "@/components/typography";

import cardUserImgPlaceholder from "@/assets/index/avatar.png";
// ======================================================
// EXPLORE PAGE COMPONENT ===============================
// ======================================================

import { getAllCreatorList } from '../../api/explore/explore'
// import { useEffect } from "react";
export default async function ExplorePage() {
  const categories = [
    "Writers & Journalists",
    "Gaming Creators",
    "Video Creators",
    "Musicians",
    "Visual Artists",
    "Communities",
    "Podcasters",
    "Tutorials & Education",
    "Local Business",
    "Non-Profits",
  ]

  let data: any
  data = await getAllCreatorList();
  if(data?.data?.status === 200 && data?.data?.msg === 'success') { 
    data = data.data.data
    data = data.map((item: any)=>{
    item.avatar = item.avatar ? ({
      "src": item.avatar,
      "height":61,
      "width":60,
      "blurDataURL": item.avatar,
      "blurWidth":8,
      "blurHeight":8
      }) : cardUserImgPlaceholder
      return item;
    })
  } else {
    data = []
  }

  const categoriesWise = categories.reduce((acc: any, curr: any)=> { acc[curr]=[]; return acc}, {});
  categoriesWise['Unknown category'] = [];

  for(let i=0; i<data.length; i++) {
    if(data[i]?.categories?.length) {
        for(let j=0; j<data[i].categories.length; j++) {
            if(categoriesWise[data[i].categories[j]]) {
                categoriesWise[data[i].categories[j]].push(data[i])
            } else {
                categoriesWise['Unknown category'].push(data[i])
            }
        }
    } else {
        categoriesWise['Unknown category'].push(data[i])
    }
}

const allCategries = Object.keys(categoriesWise)
  return (
    <main>
      <HeroSection />
     
        {/* Writers & Journalists */}
        <div className="py-16" >
        { allCategries.map((category: any, index: any)=> {
          if(categoriesWise[category]?.length) {
            return (
                
                  <CreatorsListSection
                  key = {index}
                    title= {category}
                    link="/explore/writers-and-journalists"
                    list={categoriesWise[category]}
                    pagination={false}
                    padding="pb-10"
                  />
                
              )
          } else {
            return null
          }
          
            
            })}
            </div>
      
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
          <H1 className="text-secondary">Explore our Creators</H1>
          <P1>
            Whether you&apos;re looking for someone new to follow or just taking
            a browse, check <br /> out some of our amazing creators below.
          </P1>
        </div>
      </div>
    </section>
  );
};
