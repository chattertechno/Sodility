// COMPONENTS
import { CreatorsListSection } from "@/components/pages/explore";
import { H1, H4 } from "@/components/typography";

// ======================================================
// SEARCH CREATORS PAGE COMPONENT =======================
// ======================================================
export default function SearchCreatorsPage() {
  return (
    <main>
      <HeroSection />
      <H4 className="mt-8 px-6">Some Of Our Popular Creators</H4>
      <CreatorsListSection list={[1, 2]} pagination={false} />
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
          <H1 className="text-secondary">404 Not Found</H1>
        </div>
      </div>
    </section>
  );
};
