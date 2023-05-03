"use client";

import CreatorCard from "../shared/CreatorsCard";
import { H4, SubH1 } from "../typography";

import cardUserImgPlaceholder from "@/assets/index/avatar.png";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { Pagination } from "../shared";

// ======================================================
// CREATORS LIST SECTION COMPONENT ======================
// ======================================================
export const CreatorsListSection = ({
  list,
  pagination = true,
  link,
  title,
  padding
}: {
  list: any[];
  pagination?: boolean;
  link?: Url;
  title?: string;
  padding?: string;
}) => {
  // const [page, setPage] = useState(1);
  console.log("explore page ", JSON.stringify(cardUserImgPlaceholder));
  list = list.map((item) => {
    item.avatar = item.avatar || cardUserImgPlaceholder
    return item;
  });

  console.log("explore page ", list);
  return (
    <section className={padding ? padding : "py-16"}>
      <div className="md:w-[90%] mx-auto  px-6">
        {title && (
          <div className="flex gap-6 items-baseline mb-4">
            <H4 className="text-secondary font-semibold">{title}</H4>
            <SubH1 className="text-[10px] font-semibold text-gray-400 capitalize">
              <Link href={link!}>view all {list.length}</Link>
            </SubH1>
          </div>
        )}
        {/* cards - list  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((item, i) => (
            <CreatorCard
              key={i}
              img={item.avatar || cardUserImgPlaceholder}
              username={item.username || "N/A"}
              title={item.title || "N/A"}
              description={item.description || "N/A"}
              supporters={item.supporters || 0}
            />
          ))}
        </div>
        {/* pagination  */}
        {pagination && <Pagination title="Results" />}
      </div>
    </section>
  );
};
