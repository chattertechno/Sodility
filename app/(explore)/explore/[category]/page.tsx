// COMPONENTS
import { H1, P1 } from "@/components/typography";

// ASSETS
import { CreatorsListSection } from "@/components/pages/explore";

// ======================================================
// WRITERS AND JOURNALIST PAGE COMPONENT ================
// ======================================================
export default function WriterAndJournalistPage() {
  return (
    <main>
      <HeroSection />
      <CreatorsListSection list={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
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
          <H1 className="text-secondary">Writers & Journalists</H1>
          <P1>
            From edge-of-your-chair fiction to deep investigative journalism,
            Sodality is <br /> welcome to all, have a browse below of our
            writers & journalists.
          </P1>
        </div>
      </div>
    </section>
  );
};