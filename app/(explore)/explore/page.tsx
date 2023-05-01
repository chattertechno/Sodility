// COMPONENTS
import { CreatorsListSection } from "@/components/pages/explore";
import { H1, P1 } from "@/components/typography";

// ======================================================
// EXPLORE PAGE COMPONENT ===============================
// ======================================================
export default function ExplorePage() {
  return (
    <main>
      <HeroSection />
      <div className="py-16">
        {/* Writers & Journalists */}
        <CreatorsListSection
          title="Writers & Journalists"
          link="/explore/writers-and-journalists"
          list={[1, 2, 3]}
          pagination={false}
          padding="pb-10"
        />
        {/* Gaming Creators */}
        <CreatorsListSection
          title="Gaming Creators"
          link="/explore/gaming-creators"
          list={[1, 2, 3]}
          pagination={false}
          padding="pb-10"
        />
        {/* Video Creators */}
        <CreatorsListSection
          title="Video Creators"
          link="/explore/video-creators"
          list={[1, 2, 3]}
          pagination={false}
          padding="pb-10"
        />
        {/* Musicians */}
        <CreatorsListSection
          title="Musicians"
          link="/explore/musicians"
          list={[1, 2, 3]}
          pagination={false}
          padding="pb-10"
        />
        {/* Visual Artists */}
        <CreatorsListSection
          title="Visual Artists"
          link="/explore/visual-artists"
          list={[1, 2, 3]}
          pagination={false}
          padding="pb-10"
        />
        {/* Communities */}
        <CreatorsListSection
          title="Communities"
          link="/explore/communities"
          list={[1, 2, 3]}
          pagination={false}
          padding="pb-10"
        />
        {/* Podcasters */}
        <CreatorsListSection
          title="Podcasters"
          link="/explore/podcasters"
          list={[1, 2, 3]}
          pagination={false}
          padding="pb-10"
        />
        {/* Tutorials & Education */}
        <CreatorsListSection
          title="Tutorials & Education"
          link="/explore/tutorials-and-education"
          list={[1, 2, 3]}
          pagination={false}
          padding="pb-10"
        />
        {/* Local Business */}
        <CreatorsListSection
          title="Local Business"
          link="/explore/local-business"
          list={[1, 2, 3]}
          pagination={false}
          padding="pb-10"
        />
        {/* Non-Profits */}
        <CreatorsListSection
          title="Non-Profits"
          link="/explore/non-profits"
          list={[1, 2, 3]}
          pagination={false}
          padding="pb-5"
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
