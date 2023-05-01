// COMPONENTS
import { CreatorsListSection } from "@/components/pages/explore";
import { H1, P1 } from "@/components/typography";

// ======================================================
// SEARCH CREATORS PAGE COMPONENT =======================
// ======================================================
export default function SearchCreatorsPage() {
  return (
    <main>
      <HeroSection />
      <div className="md:w-[90%] mx-auto  px-6 pt-8 -mb-10">
        <P1>Results (2)</P1>
      </div>
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
          <H1 className="text-secondary">Search: {"placeholder"}</H1>
        </div>
      </div>
    </section>
  );
};
