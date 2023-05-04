import Image, { StaticImageData } from "next/image";
import { H5, P1, SubH1 } from "../typography";

// ASSETS
import heartIcon from "@/assets/heart.png";
import Link from "next/link";

const CreatorCard = ({
  img,
  username,
  title,
  description,
  supporters,
}: {
  img: StaticImageData;
  username: string;
  title: string;
  description: string;
  supporters: number;
}) => {
  return (
    <Link
      href="/creator"
      className="rounded overflow-hidden bg-white md:w-[22rem]"
    >
      {/* top  */}
      <div className="pt-2 bg-card-pattern relative h-40">
        <Image
          src={img}
          alt={username}
          width={40}
          height={40}
          className="absolute rounded-full -bottom-6 right-6 border-4 border-white"
        />
      </div>
      {/* bottom  */}
      <div className="space-y-2 p-5 border border-gray-200 rounded-br rounded-bl">
        <SubH1 className="text-appGray-500">@{username}</SubH1>
        <H5>{title}</H5>
        <P1>{description}</P1>
        <P1 className="flex gap-1.5 items-center">
          <span className="">
            <Image src={heartIcon} alt="heart icon" />
          </span>
          {supporters} supporters
        </P1>
      </div>
    </Link>
  );
};

export default CreatorCard;
