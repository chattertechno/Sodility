// COMPONENTS
import { CreatorsListSection } from "@/components/pages/explore";
import { H1, P1 } from "@/components/typography";

import cardUserImgPlaceholder from "@/assets/index/avatar.png";
// ======================================================
// EXPLORE PAGE COMPONENT ===============================
// ======================================================
export default function ExplorePage() {
 let data: any = []
 data = [{
      username: "username1",
      avatar: "https://placehold.co/400x400/501017/f00100.png",
      title: "title",
      description: "this is the description describe1",
      supporters: 6,
  }, {
      username: "username2",
      avatar: "https://placehold.co/400x400/501017/f00100.png",
      title: "title",
      description: "this is the description describe2",
      supporters: 9,
  }]

  data = data.map((item: any)=>{
      item.avatar = item.avatar ? ({
        "src": item.avatar,
        "height":61,
        "width":60,
        "blurDataURL": item.avatar,
        "blurWidth":8,
        "blurHeight":8
    }) : cardUserImgPlaceholder
      return item
  })
  return (
    <main>
      <HeroSection />

      <div className="py-16">
        {/* Writers & Journalists */}
        <CreatorsListSection
          title="Writers & Journalists"
          link="/explore/writers-and-journalists"
          list={data}
          pagination={false}
          padding="pb-10"
        />
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
