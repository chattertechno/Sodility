"use client";
import React from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { getLocaleData } from "../../../service/localStorageService";
// ======================================================
// CREATOR PAGE COMPONENT ===============================
// ======================================================

// API
import {
  getAllContentsForSupporter,
  getUserProfile,
} from "../../api/admin/dashboard";

import { extentionHandler } from "../../utils/handler";
import { getContentByCreatorIdApi } from "@/http/contentApi";
import { getCreatorByIdApi } from "@/http/creatorApi";
import { errorToast } from "@/helper/toster";

export default function CreatorAdminPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("key");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [userType, setUserType] = useState("");
  const route = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const data = getLocaleData("user") as any;
    if (data && data?.role != "creator")
      route.push(`/creator?key=${searchQuery}`);
    else if (data == null && userType == undefined) route.push("/login");

    else if (searchQuery) {
      getCreatorByIdApi(searchQuery || "").then((_data) => {
        setIsLoading(false);
        setData(_data);
      });
    } else {
      setIsLoading(false);
      setData(null);
      errorToast("creator doesn't existed");
    }
    setUserType(data?.role);
  }, [searchQuery]);
  if (userType != "creator") return <></>;
  return (
    <main>
      <section className="bg-creator-banner py-28" />
      <section className="md:w-[90%] mx-auto  px-6 py-8 pb-28">
        <CreatorInfo
          img={data?.avatar || cardUserImgPlaceholder}
          username={data?.username || "N/A"}
          bio={data?.bio || "N/A"}
          supporters={data?.supporters || 0}
          followers={data?.followers || 0}
          isLoading={isLoading}
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
          <CreatorContent creatorId={searchQuery} />
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
  isLoading,
}: {
  img: StaticImageData;
  username: string;
  bio: string;
  supporters: number;
  followers: number;
  isLoading: boolean;
}) => {
  const dispatch = useAppDispatch();
  if (isLoading)
    return (
      <div className="flex flex-col items-center rounded border border-appGray-450 hover:shadow-sm py-10">
        {" "}
        Loading ...{" "}
      </div>
    );
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      {/* left - user  */}
      <div className="flex items-center gap-6">
        <div className="w-30 h-30 rounded-full">
          <Image
            src={img}
            alt={username}
            width={100}
            height={100}
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
        <H5>Digital Cash Network</H5>
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

const CreatorContent = ({ creatorId }: any) => {
  const content1 = [
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

  const [content, setContent] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    if (creatorId) {
      getContentByCreatorIdApi(creatorId).then((data: any) => {
        // if(res.data.status === 200 && res.data.msg === 'success') {
        if (data && data?.length > 0) {
          const _data = data.map((item: any) => {
            item.ipfs_url =
              item.ipfs_url && item.ipfs_url.includes("http")
                ? item.ipfs_url
                : "";
            return {
              articleType: {
                content: extentionHandler(item.type || "audio"),
                status: item.locked ? "locked" : "",
              },
              content: item.body || "",
              img: cardUserImgPlaceholder,
              video: item.ipfs_url
                ? {
                    blurDataURL: item.ipfs_url,
                    blurHeight: 4,
                    blurWidth: 8,
                    height: 431,
                    src: item.ipfs_url,
                    width: 768,
                  }
                : videoPlaceholder,
              metadata: item.created_at,
              title: item.title,
              image: item.ipfs_url
                ? {
                    src: item.ipfs_url,
                    height: 61,
                    width: 60,
                    blurDataURL: item.ipfs_url,
                    blurWidth: 8,
                    blurHeight: 8,
                  }
                : "",
            };
          });
          setContent(_data);
          setLoading(false);
          // } else {
          //   setLoading(false);
          // }
        } else {
          setLoading(false);
          setContent([]);
          // errorToast('Unable to fetch creator content')
          // alert('Unable to fetch data');
        }
      });
    }else{
      setContent([])
      setLoading(false)
      errorToast("unable to get content")
    }
  }, [creatorId]);

  return (
    <div className="flex-1 space-y-8">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <>loading...</>
        </div>
      ) : content.length > 0 ? (
        content.map((item: any, index: number) => {
          if (item.articleType.content === "video") {
            return <VideoArticle content={item} key={index} />;
          } else if (item.articleType.content === "audio") {
            return <AudioArticle content={item} key={index} />;
          } else if (item.articleType.content === "text") {
            return <TextArticle content={item} key={index} />;
          } else if (item.articleType.content === "image") {
            return <ImageArticle content={item} key={index} />;
          }
        })
      ) : (
        <div className="flex justify-center items-center h-96">
          <>No any article posted yet</>
        </div>
      )}
      <div className="">
        <Pagination title="Posts" />
      </div>
    </div>
  );
};
