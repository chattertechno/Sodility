"use client";

import Image, { StaticImageData } from "next/image";
// COMPONENTS
import {
  AudioArticle,
  ImageArticle,
  TextArticle,
  VideoArticle,
} from "@/components/pages/creator";
import { Button, Pagination, SocialMedias } from "@/components/shared";
import { H2, H3, H4, H5, P1, SubH1, SubH2 } from "@/components/typography";

// ASSETS
import addPostIcon from "@/assets/add-post.svg";
import imagePlaceholder from "@/assets/creator/image-article-placeholder.png";
import videoPlaceholder from "@/assets/creator/post-video.png";
import heartIcon from "@/assets/heart.png";
import cardUserImgPlaceholder from "@/assets/index/avatar.png";
import userIcon from "@/assets/user.png";

// support
import fanIcon from "@/assets/creator/fan.png";
import oneOffIcon from "@/assets/creator/one-off.png";
import superFanIcon from "@/assets/creator/super-fan.png";
import supporterIcon from "@/assets/creator/supporter.png";
import { openModal } from "@/context/features/modal/modalSlice";
import { useAppDispatch } from "@/context/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocaleData } from "../../../service/authService";
// ======================================================
// CREATOR PAGE COMPONENT ===============================
// ======================================================
export default function CreatorAdminPage() {
  const dispatch = useAppDispatch();
  const [userType , setUserType] = useState("")
  const route = useRouter()
  
  useEffect(()=>{
    const data = getLocaleData("user") as any
    if(data && data?.role != "creator" ) route.push("/")
    else if(data==null&&userType==undefined) route.push("/login")
    setUserType(data?.role)
  },[userType])
  if(userType != "creator") return <></>
  return (
    <main>
      <section className="bg-creator-banner py-28" />
      <section className="md:w-[90%] mx-auto  px-6 py-8 pb-28">
        <CreatorInfo 
          img={cardUserImgPlaceholder}
          username="TheDesertLynx"
          bio="Joël Valenzuela is documenting the global digital cash revolution."
          supporters={7392}
          followers={1390}
        />
        <SupportSection />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="space-y-3">
            <Button
              className="w-full py-4 flex items-center gap-2 justify-center"
              action={() => {
                dispatch(openModal("addPost"));
              }}
            >
              <Image
                src={addPostIcon}
                alt="add post icon"
                width={20}
                height={20}
              />
              <span>Add a Post</span>
            </Button>
            <SideBar />
          </div>
          <CreatorContent />
        </div>
      </section>
    </main>
  );
}

// EXTENDED COMPONENTS =================================
const CreatorInfo = ({
  img,
  username,
  bio,

  supporters,
  followers,
}: {
  img: StaticImageData;
  username: string;
  bio: string;
  supporters: number;
  followers: number;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      {/* left - user  */}
      <div className="flex items-center gap-6">
        <div className="w-30 h-30 rounded-full">
          <Image
            src={img}
            alt={username}
            width={100}
            className="rounded-full p-1 border border-appGray-400"
          />
        </div>
        <div className="flex flex-col">
          <SubH1 className="text-appGray-500">@{username}</SubH1>
          <H4>{bio}</H4>
          <div className="flex gap-4 capitalize mt-2">
            <P1 className="flex gap-1.5 items-center">
              <span className="">
                <Image src={userIcon} alt="user icon" />
              </span>
              {followers} followers
            </P1>
            <P1 className="flex gap-1.5 items-center">
              <span className="">
                <Image src={heartIcon} alt="heart icon" />
              </span>
              {supporters} supporters
            </P1>
          </div>
        </div>
      </div>
      {/* right - buttons  */}
      <div className="flex items-center justify-center md:justify-start gap-4">
        <Button variant="primary-outline" action={() => {}}>
          Follow
        </Button>
        <Button action={() => dispatch(openModal("donate"))}>Donate</Button>
      </div>
    </div>
  );
};

const SupportSection = () => {
  const Card = ({
    img,
    width = 100,
    title,
    amount,
    action,
    subH = true,
  }: {
    img: StaticImageData;
    width?: number;
    title: string;
    amount: string;
    action: () => void;
    subH?: boolean;
  }) => {
    return (
      <div className="rounded border border-appGray-450 py-3 px-5 w-96 hover:shadow-sm flex justify-center">
        <div className="w-14 flex flex-col items-center gap-4 my-10">
          <Image
            src={img}
            alt={title + " icon"}
            width={width}
            // className="rounded-full p-1 border border-appGray-400"
          />
          <div className="space-y-1 mb-2">
            <H5 className="!font-normal">{title}</H5>
            <H3>{amount}</H3>
            {subH && <SubH2 className="capitalize">per month</SubH2>}
          </div>
          {/* button  */}
          <Button className="px-8" action={action}>
            Join
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="my-10 flex flex-col md:flex-row gap-5 justify-between items-center text-center">
      <Card
        img={supporterIcon}
        title="Supporter"
        amount="$1.00"
        action={() => {}}
      />
      <Card
        img={fanIcon}
        width={42}
        title="Fan"
        amount="$5.00"
        action={() => {}}
      />
      <Card
        img={superFanIcon}
        width={38}
        title="Super Fan"
        amount="$10.00"
        action={() => {}}
      />
      <Card
        img={oneOffIcon}
        width={53}
        title="One-off Donation"
        amount=""
        action={() => {}}
        subH={false}
      />
    </div>
  );
};

const SideBar = () => {
  return (
    <aside className="h-fit rounded border border-appGray-450 p-8  w-72 hover:shadow-sm flex justify-center">
      <div className="space-y-4">
        <H5 >Digital Cash Network</H5>
        <P1>
          Documenting the global digital cash revolution, the greatest financial
          revolution the world has seen in recent times.
        </P1>
        <P1>
          Podcasts, news videos, interviews, articles, and more about the
          exciting world of cryptocurrency, blockchain tech, and
          decentralization.
        </P1>
        {/* social media  */}
        <SocialMedias />
      </div>
    </aside>
  );
};

const CreatorContent = () => {
  const content = [
    {
      articleType: {
        content: "video",
        status: "locked",
      },
      img: cardUserImgPlaceholder,
      video: videoPlaceholder,
      metadata: "APR 16, 2021 AT 5:36 PM",
      title:
        "See Something Say Something Online takes aim at Freedom of Speech",
    },
    {
      articleType: {
        content: "audio",
        status: "locked",
      },
      img: cardUserImgPlaceholder,
      metadata: "APR 16, 2021 AT 5:36 PM ",
      title: "Interview: Roger Ver on Dash",
    },
    {
      articleType: {
        content: "text",
        status: "locked",
      },
      img: cardUserImgPlaceholder,
      metadata: "APR 16, 2021 AT 5:36 PM",
      title: "Cryptocurrency's Usability Crisis",
      content:
        "Next month marks the 11th anniversary of Bitcoin Pizza Day, the first recorded instance of an item purchased with cryptocurrency. Over the following decade we've seen an absolute explosion in both interest and investment into the digital currency space. Despite this, however, we've seen comparatively few actual instances of it being used as a day-to-day money. Of course, there are exceptions. I've been living un-banked off of crypto since 2016. But the fact that people still disbelieve me when I tell them this is a sign that “peer-to-peer electronic cash system” is still very much more a theoretical concept than a present-day reality.",
    },
    {
      articleType: {
        content: "image",
        status: "locked",
      },
      img: cardUserImgPlaceholder,
      metadata: "APR 16, 2021 AT 5:36 PM",
      title: "Just another day hard at work on the job.",
      image: imagePlaceholder,
    },
  ];

  return (
    <div className="flex-1 space-y-8">
      <VideoArticle content={content[0]} />
      <AudioArticle content={content[1]} />
      <TextArticle content={content[2]} />
      <ImageArticle content={content[3]} />
      <div className="">
        <Pagination title="Posts" />
      </div>
    </div>
  );
};
