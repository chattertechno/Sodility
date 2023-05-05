"use client"
// COMPONENTS
import { H1, P1 } from "@/components/typography";
import { useEffect, useState } from "react";

// ASSETS
import ContentCard from "@/components/ContentCard";
import { getCreatorByCategoryApi } from "@/http/creatorApi";
import { useParams } from "next/navigation";
import { categories } from "../../../../staticData";
import { extentionHandler } from "@/app/utils/handler";
import cardUserImgPlaceholder from "@/assets/avatar.png";
import videoPlaceholder from "@/assets/creator/post-video.png";
// ======================================================
// WRITERS AND JOURNALIST PAGE COMPONENT ================
// ======================================================
export default function WriterAndJournalistPage() {
  const {category} = useParams();
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

useEffect(()=>{
  setIsLoading(true)
  if(category){
    getCreatorByCategoryApi(category||"").then((_data)=>{
      if(!_data){
        setIsLoading(false)
        setData([])
      }else{
        const modifyData = _data.map((item:any)=>{
          item.ipfs_url = item.ipfs_url && item.ipfs_url.includes('http') ? item.ipfs_url : "";
          return { articleType: {
                  content: extentionHandler(item.type || 'audio'),
                  status: item.locked ? 'locked' : ""
              },
              content: item.body || "",
              img: cardUserImgPlaceholder,
              video: (item.ipfs_url ? {
                blurDataURL: item.ipfs_url,
                blurHeight: 4,
                blurWidth: 8,
                height: 431,
                src: item.ipfs_url,
                width: 768
              } : videoPlaceholder),
              metadata: item.created_at,
              title: item.title,
              image: (
                item.ipfs_url ?
                {
                  "src":item.ipfs_url,
                  "height":61,
                  "width":60,
                  "blurDataURL":item.ipfs_url,
                  "blurWidth":8,
                  "blurHeight":8
              } : ""
              ),
          }
        })
        setIsLoading(false)
        setData(modifyData)
      }
      return
    })
  }else{
    setIsLoading(false)
  }

},[category])
  return (
    <main>
      <HeroSection title={category} />
      {isLoading?<div className="flex flex-col items-center rounded border border-appGray-450 hover:shadow-sm py-10"> Loading ... </div>:
    <ContentCard list={data}/>}
    </main>
  );
}

// EXTENDED COMPONENTS =================================
const HeroSection = ({title}:any) => {
  return (
    <section className="bg-primaryGradient py-16">
      <div className="md:w-[90%] mx-auto  px-6 flex flex-col items-center">
        {/* top - heading  */}
        <div className=" w-full space-y-3">
          <H1 className="text-secondary">{categories?.find((itm)=>(itm.key==title))?.value||title}</H1>
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
