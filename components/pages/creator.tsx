"use client";

import Image from "next/image";
import { useState } from "react";

// COMPONENTS
import { Button } from "../shared";
import { P1, SubH2 } from "../typography";

// ASSETS
import audioIcon from "@/assets/audio.png";
import audioPlayIcon from "@/assets/creator/audio-play-icon.svg";
import imageIcon from "@/assets/image.svg";
import lockIcon from "@/assets/lock-white.svg";
import lockedIcon from "@/assets/lock.png";
import textIcon from "@/assets/text.png";
import videoIcon from "@/assets/video.png";

// =======================================================
// VIDEO ARTICLE COMPONENT ===============================
// =======================================================
export const VideoArticle = ({ content }: any) => {
  return (
    <article className="overflow-hidden rounded border border-appGray-450  hover:shadow-md">
      {/* top - info  */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <Image
            src={content.img}
            alt="user icon"
            width={60}
            className="rounded-full p-1 border border-appGray-400"
          />
          <div className="">
            <SubH2>{content.metadata}</SubH2>
            <P1 className="!font-medium">{content.title}</P1>
          </div>
        </div>
        {/* content type  */}
        <div className="md:flex hidden gap-3 pr-2">
          <div className="flex items-center gap-2">
            <Image src={videoIcon} alt="video icon" width={10} height={10} />
            <SubH2 className="capitalize">{content.articleType.content}</SubH2>
          </div>
          {content.articleType.status === "locked" ? (
            <div className="flex items-center gap-2">
              <Image
                src={lockedIcon}
                alt="locked icon"
                width={10}
                height={10}
              />
              <SubH2 className="capitalize">{content.articleType.status}</SubH2>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src={lockedIcon}
                alt="locked icon"
                width={10}
                height={10}
              />
              <SubH2 className="capitalize">unlocked</SubH2>
            </div>
          )}
        </div>
      </div>
      {/* bottom - content  */}
      <div className="relative">
        {content.articleType.status === "locked" && (
          <div className="absolute top-0 left-0 h-full w-full  backdrop-blur-md">
            <div className=" flex flex-col items-center justify-center h-full">
              <div className="flex gap-3 mb-3 items-center">
                <Image src={lockIcon} alt="lock icon" width={20} height={20} />
                <P1 className="text-white pt-1">Locked</P1>
              </div>
              <P1 className="text-white">
                Unlock this and all other Fan content for $5/month
              </P1>
              <Button className="mt-4 px-8" action={() => {}}>
                Join
              </Button>
            </div>
          </div>
        )}
        <Image
          src={content.video}
          alt="video placeholder"
          width={980}
          // height={300}
        />
      </div>
    </article>
  );
};

// =======================================================
// AUDIO ARTICLE COMPONENT ===============================
// =======================================================
export const AudioArticle = ({ content }: any) => {
  // const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(20);

  return (
    <article className="overflow-hidden rounded border border-appGray-450  hover:shadow-md">
      {/* top - info  */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <Image
            src={content.img}
            alt="user icon"
            width={60}
            className="rounded-full p-1 border border-appGray-400"
          />
          <div className="">
            <SubH2>{content.metadata}</SubH2>
            <P1 className="!font-medium">{content.title}</P1>
          </div>
        </div>
        {/* content type  */}
        <div className="md:flex hidden gap-3 pr-2">
          <div className="flex items-center gap-2">
            <Image src={audioIcon} alt="audio icon" width={10} height={10} />
            <SubH2 className="capitalize">{content.articleType.content}</SubH2>
          </div>
          {content.articleType.status === "locked" ? (
            <div className="flex items-center gap-2">
              <Image
                src={lockedIcon}
                alt="locked icon"
                width={10}
                height={10}
              />
              <SubH2 className="capitalize">{content.articleType.status}</SubH2>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src={lockedIcon}
                alt="locked icon"
                width={10}
                height={10}
              />
              <SubH2 className="capitalize">unlocked</SubH2>
            </div>
          )}
        </div>
      </div>
      {/* bottom - content  */}
      <div className="relative border-t border-appGray-450">
        {content.articleType.status === "locked" && (
          <div className="absolute top-0 left-0 h-full w-full  backdrop-blur-md bg-[#0B0F3B]/70 py-8">
            <div className="flex flex-col md:flex-row items-center md:justify-between justify-center px-10 h-full">
              <div className="">
                <div className="flex gap-3 mb-3 items-center justify-center md:justify-normal">
                  <Image
                    src={lockIcon}
                    alt="lock icon"
                    width={20}
                    height={20}
                  />
                  <P1 className="text-white pt-1">Locked</P1>
                </div>
                <P1 className="text-white text-center md:text-start">
                  Unlock this and all other Super Fan content for $10/month
                </P1>
              </div>
              <Button className="mt-4 px-8" action={() => {}}>
                Join
              </Button>
            </div>
          </div>
        )}
        {/* audio */}
        <div className="p-8 bg-gray-100 flex gap-3 items-center">
          <Image
            src={audioPlayIcon}
            alt="audio play icon"
            width={40}
            height={40}
          />
          {/* progress bar  */}
          <div className="flex-1">
            {/* top - time */}
            <div className="flex justify-between">
              <P1 className="">0:00</P1>
              <P1 className="">3:00</P1>
            </div>
            {/* bottom - bar  */}
            <div className="bg-[#7F8C9869] h-1 w-full rounded-full mt-2">
              <div
                className={`bg-appGray-500 h-full w-[${progress.toString()}%] rounded-full`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

// =======================================================
// TEXT ARTICLE COMPONENT ================================
// =======================================================
export const TextArticle = ({ content }: any) => {
  return (
    <article className="overflow-hidden rounded border border-appGray-450  hover:shadow-md">
      {/* top - info  */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <Image
            src={content.img}
            alt="user icon"
            width={60}
            className="rounded-full p-1 border border-appGray-400"
          />
          <div className="">
            <SubH2>{content.metadata}</SubH2>
            <P1 className="!font-medium">{content.title}</P1>
          </div>
        </div>
        {/* content type  */}
        <div className="md:flex hidden gap-3 pr-2">
          <div className="flex items-center gap-2">
            <Image src={textIcon} alt="video icon" width={10} height={10} />
            <SubH2 className="capitalize">{content.articleType.content}</SubH2>
          </div>
          {content.articleType.status === "locked" ? (
            <div className="flex items-center gap-2">
              <Image
                src={lockedIcon}
                alt="locked icon"
                width={10}
                height={10}
              />
              <SubH2 className="capitalize">{content.articleType.status}</SubH2>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src={lockedIcon}
                alt="locked icon"
                width={10}
                height={10}
              />
              <SubH2 className="capitalize">unlocked</SubH2>
            </div>
          )}
        </div>
      </div>
      {/* bottom - content  */}
      <div className="relative border-t border-appGray-450">
        {content.articleType.status === "locked" && (
          <div className="absolute top-0 left-0 h-full w-full  backdrop-blur-md bg-[#0B0F3B]/70">
            <div className="flex flex-col md:flex-row items-center md:justify-between justify-center px-10 h-full">
              <div className="">
                <div className="flex gap-3 mb-3 items-center justify-center md:justify-normal">
                  <Image
                    src={lockIcon}
                    alt="lock icon"
                    width={20}
                    height={20}
                  />
                  <P1 className="text-white pt-1">Locked</P1>
                </div>
                <P1 className="text-white text-center md:text-start">
                  Unlock this and all other Supporter content for $10/month
                </P1>
              </div>
              <Button className="mt-4 px-8" action={() => {}}>
                Join
              </Button>
            </div>
          </div>
        )}
        {/* text */}
        <div className="p-8 flex gap-3 items-center">
          <P1>{content.content}</P1>
        </div>
      </div>
    </article>
  );
};

// =======================================================
// IMAGE ARTICLE COMPONENT ===============================
// =======================================================
export const ImageArticle = ({ content }: any) => {
  return (
    <article className="overflow-hidden rounded border border-appGray-450  hover:shadow-md">
      {/* top - info  */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <Image
            src={content.img}
            alt="user icon"
            width={60}
            className="rounded-full p-1 border border-appGray-400"
          />
          <div className="">
            <SubH2>{content.metadata}</SubH2>
            <P1 className="!font-medium">{content.title}</P1>
          </div>
        </div>
        {/* content type  */}
        <div className="md:flex hidden gap-3 pr-2">
          <div className="flex items-center gap-2">
            <Image src={imageIcon} alt="video icon" width={10} height={10} />
            <SubH2 className="capitalize">{content.articleType.content}</SubH2>
          </div>
          {content.articleType.status === "locked" ? (
            <div className="flex items-center gap-2">
              <Image
                src={lockedIcon}
                alt="locked icon"
                width={10}
                height={10}
              />
              <SubH2 className="capitalize">{content.articleType.status}</SubH2>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src={lockedIcon}
                alt="locked icon"
                width={10}
                height={10}
              />
              <SubH2 className="capitalize">unlocked</SubH2>
            </div>
          )}
        </div>
      </div>
      {/* bottom - content  */}
      <div className="relative">
        {content.articleType.status === "locked" && (
          <div className="absolute top-0 left-0 h-full w-full  backdrop-blur-md">
            <div className=" flex flex-col items-center justify-center h-full">
              <div className="flex gap-3 mb-3 items-center">
                <Image src={lockIcon} alt="lock icon" width={20} height={20} />
                <P1 className="text-white pt-1">Locked</P1>
              </div>
              <P1 className="text-white">
                Unlock this and all other Fan content for $5/month
              </P1>
              <Button className="mt-4 px-8" action={() => {}}>
                Join
              </Button>
            </div>
          </div>
        )}
        <Image
          src={content.image}
          alt="video placeholder"
          width={980}
          // height={300}
        />
      </div>
    </article>
  );
};
