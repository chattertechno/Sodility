"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

// COMPONENTS ========================================
import { H4, H5, P1, SubH1, SubH2 } from "@/components/typography";

// ASSETS ===========================================
import imagePlaceholder from "@/assets/creator/image-article-placeholder.png";
import videoPlaceholder from "@/assets/creator/post-video.png";
import {
  default as cardUserImgPlaceholder,
  default as userPlaceholder,
} from "@/assets/index/avatar.png";
import {
  AudioArticle,
  ImageArticle,
  TextArticle,
  VideoArticle,
} from "@/components/pages/creator";
import { Pagination } from "@/components/shared";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllContents, getUserProfile } from '../../api/admin/dashboard'
import { extentionHandler } from '../../utils/handler'
// ==========================================================
// DASHBOARD PAGE COMPONENT =================================
// ==========================================================
export default function DashboardPage() {
  const [userType , setUserType] = useState("")
  const route = useRouter()

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("user") as any) as any
    console.log(data,"rolerole")
    if(data && data?.role != "creator" ) route.push("/")
    else if(data==null&&userType==undefined) route.push("/")
    setUserType(data?.role)
  },[userType])
  if(userType != "creator") return <></>
  return (
    <section className="py-8 md:py-14 md:w-[90%] mx-auto  px-6 flex flex-col md:flex-row gap-8">
      {/* left - info  */}
      <div className="md:w-[30%] space-y-8">
        <UserInfo />
        <Supporting />
      </div>

      {/* right - content  */}
      <div className="flex-1">
        <CreatorContent />
      </div>
    </section>
  );
}

// EXTENDED COMPONENTS ====================================

const UserInfo = () => {
  const [user, setUser] = React.useState<any>({})
  const [loadingProfile, setLoadingProfile] = React.useState<boolean>(true)
  useEffect(() => {
    getUserProfile().then((res: any) => {
      if(res.data.status === 200 && res.data.msg === 'success') {
        setLoadingProfile(false)
        setUser(res.data.data)
      } else {
        setLoadingProfile(false)
        alert("Unable to fetch user profile")
        console.log('error')
      }
    })
  }, [])

  return (<>
    { loadingProfile ? <div className="flex flex-col items-center rounded border border-appGray-450 hover:shadow-sm py-10"> loadding </div>:
    <div className="flex flex-col items-center rounded border border-appGray-450 hover:shadow-sm py-10">
      <div className="flex justify-center">
        <Image
          src={userPlaceholder}
          alt="User image"
          className="rounded-full"
          width={90}
          height={90}
        />
      </div>
      <H4 className="text-appGray-500 my-4">{user.username}</H4>
      <div className="text-center space-y-2">
        <P1 className="hover:text-primary">
          <Link href="/">My Creator Page</Link>
        </P1>
        <P1 className="hover:text-primary">
          <Link href="/">Creator Settings</Link>
        </P1>
        <P1 className="hover:text-primary">
          <Link href="/">User Settings</Link>
        </P1>
      </div>
    </div>
   }
  </>
  );
};

const Supporting = () => {
  const SupportItem = ({
    img,
    title,
    amount,
  }: {
    img: StaticImageData;
    title: string;
    amount: string;
  }) => {
    return (
      <div className="border-b p-3 px-4 border-b-appGray-450 flex gap-2 items-center">
        <div className="">
          <Image
            src={img}
            alt="user image"
            width={50}
            height={50}
            className="rounded-full border-4 border-gray-50"
          />
        </div>
        <div className="mt-1">
          <SubH2 className="">{`${title}`.slice(0, 30) + "..."}</SubH2>
          <SubH1>${amount} monthly</SubH1>
        </div>
      </div>
    );
  };
  return (
    <div className="rounded border border-appGray-450 hover:shadow-sm">
      {/* title  */}
      <div className="border-b p-3 border-b-appGray-450 flex gap-2 items-center">
        <H5>Supporters</H5>
      </div>
      {/* supporters - list  */}
      <>
        <SupportItem
          img={userPlaceholder}
          title="TheDesertLynx ( Digital Cash Network )"
          amount="6.00"
        />
        <SupportItem
          img={userPlaceholder}
          title="TheDesertLynx ( Digital Cash Network )"
          amount="6.00"
        />
        <SupportItem
          img={userPlaceholder}
          title="TheDesertLynx ( Digital Cash Network )"
          amount="6.00"
        />
      </>
    </div>
  );
};

const CreatorContent = () => {
  const [content, setContent] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // const content = [
  //   {
  //     articleType: {
  //       content: "video",
  //       status: "",
  //     },
  //     img: cardUserImgPlaceholder,
  //     video: videoPlaceholder,
  //     metadata: "APR 16, 2021 AT 5:36 PM",
  //     title:
  //       "See Something Say Something Online takes aim at Freedom of Speech",
  //   },
  //   {
  //     articleType: {
  //       content: "audio",
  //       status: "",
  //     },
  //     img: cardUserImgPlaceholder,
  //     metadata: "APR 16, 2021 AT 5:36 PM ",
  //     title: "Interview: Roger Ver on Dash",
  //   },
  //   {
  //     articleType: {
  //       content: "text",
  //       status: "",
  //     },
  //     img: cardUserImgPlaceholder,
  //     metadata: "APR 16, 2021 AT 5:36 PM",
  //     title: "Cryptocurrency's Usability Crisis",
  //     content:
  //       "Next month marks the 11th anniversary of Bitcoin Pizza Day, the first recorded instance of an item purchased with cryptocurrency. Over the following decade we've seen an absolute explosion in both interest and investment into the digital currency space. Despite this, however, we've seen comparatively few actual instances of it being used as a day-to-day money. Of course, there are exceptions. I've been living un-banked off of crypto since 2016. But the fact that people still disbelieve me when I tell them this is a sign that “peer-to-peer electronic cash system” is still very much more a theoretical concept than a present-day reality.",
  //   },
  //   {
  //     articleType: {
  //       content: "image",
  //       status: "",
  //     },
  //     img: cardUserImgPlaceholder,
  //     metadata: "APR 16, 2021 AT 5:36 PM",
  //     title: "Just another day hard at work on the job.",
  //     image: imagePlaceholder,
  //   },
  // ];

  useEffect(() => {

    getAllContents().then((res: any) => {
      if(res.data.status === 200 && res.data.msg === 'success') {
        if(res.data.data.length > 0) {
          const data = res.data.data.map((item: any) => {
            return { articleType: {
                    content: extentionHandler(item.type || 'audio'),
                    status: item.status || ""
                },
                img:cardUserImgPlaceholder,
                
                // (item.ipfs_url ?
                //   {
                //     blurDataURL: "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar.c785945e.png&w=8&q=70",
                //     blurHeight: 8,
                //     blurWidth: 8,
                //     height: 61,
                //     src: item.ipfs_url,
                //     width: 60
                //   }
                //   : cardUserImgPlaceholder),


                video: (item.ipfs_url ? {
                  blurDataURL: "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpost-video.39550290.png&w=8&q=70",
                  blurHeight: 4,
                  blurWidth: 8,
                  height: 431,
                  src: item.ipfs_url,
                  width: 768
                } : videoPlaceholder),
                metadata: item.created_at,
                title: item.title
            }
          })
          setContent(data);
          setLoading(false);
        } else {
          setLoading(false);
          alert('No data found');
        }
      
      } else {
        setLoading(false);
        alert('Unable to fetch data');
      }
      // setContent(res.data);
    })

  }, []);

  console.log('content', content);

  return (
    
    <div className="flex-1 space-y-8">
      {
        loading ? <div className="flex justify-center items-center h-96"><>loading....</></div> :
        content.length > 0 ? 
        content.map((item: any, index: number) => {
          if(item.articleType.content === 'video') {
            return <VideoArticle content={item} key={index} />
          } else if(item.articleType.content === 'audio') {
            return <AudioArticle content={item} key={index} />
          } else if(item.articleType.content === 'text') {
            return <TextArticle content={item} key={index} />
          } else if(item.articleType.content === 'image') {
            return <ImageArticle content={item} key={index} />
          }
        }): <div className="flex justify-center items-center h-96"><>No data found</></div>
      }
      {/* <VideoArticle content={content[0]} />
      <AudioArticle content={content[1]} />
      <TextArticle content={content[2]} />
      <ImageArticle content={content[3]} />
      <div className="">
        <Pagination title="Posts" />
      </div> */}
    </div>
  );
};
