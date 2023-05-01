import Image, { StaticImageData } from "next/image";

// COMPONENTS
import { H1, H2, H3, H4, P1, SubH1 } from "@/components/typography";

// ASSETS
import playBtn from "@/assets/about/playBtn.svg";
import videoPlaceholder from "@/assets/about/video.png";
// break down icons
import communitySupportIcon from "@/assets/about/community-support.png";
import creatorEmpowermentIcon from "@/assets/about/creator-empowerment.png";
import decentralizedIcon from "@/assets/about/decentralized.png";
import directCryptoIcon from "@/assets/about/direct-crypto-payments.png";
import freeSpeechIcon from "@/assets/about/free-speech.png";
import joelImage from "@/assets/about/joel.png";
import noCommissionIcon from "@/assets/about/no-commission.png";
// content icons
import contentDiversityIcon from "@/assets/about/content-diversity.png";
import lockedOrUnlockedIcon from "@/assets/about/locked-or-unlocked.png";
import supporterTierIcon from "@/assets/about/supporter-tiers.png";

// ==============================================
// ABOUT PAGE COMPONENT =========================
// ==============================================
export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <BreakItDownSection />
      <TestimonialSection />
      <YourContentSection />
    </>
  );
}

const HeroSection = () => {
  return (
    <section className="bg-primaryGradient py-16 h-[75vh] md:h-[60vh] md:mb-80">
      <div className="md:w-[90%] mx-auto  px-6 flex flex-col items-center">
        {/* top - heading  */}
        <div className="text-center w-full space-y-3">
          <H1 className="text-secondary">
            Fund your creative work simply and easily
          </H1>
          <P1>
            One off and regular support from your fans, no hassle, no fees and
            completely open to everyone.
          </P1>
        </div>
        {/* bottom - video */}
        <div className="w-[90%] mt-12 ">
          <div className="relative">
            {/* <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/1Q8fG0TtVAY"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
            <Image
              src={videoPlaceholder}
              alt="video placeholder"
              width={1000}
              height={600}
              className="mx-auto"
            />
            <div className="absolute top-0 left-0 h-full w-full">
              <Image
                src={playBtn}
                alt="play button"
                width={50}
                height={50}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {/* stats  */}
          <div className="w-[80%] mx-auto py-8 flex justify-around">
            <div className="flex flex-col items-center">
              <H3 className="text-tertiary">116</H3>
              <P1>Creators</P1>
            </div>
            <div className="flex flex-col items-center">
              <H3 className="text-tertiary">32,853</H3>
              <P1>Supporters</P1>
            </div>
            <div className="flex flex-col items-center">
              <H3 className="text-tertiary">$570k</H3>
              <P1>Raised</P1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BreakItDownSection = () => {
  const cards = [
    {
      icon: directCryptoIcon,
      title: "Direct Crypto Payments",
      description:
        "Skip the middleman, get payments instantly into your crypto wallet of choice.",
    },
    {
      icon: creatorEmpowermentIcon,
      title: "Creator Empowerment",
      description:
        "Interact with your audience on your terms, set up supporter tiers, lock and unlock content and more.",
    },
    {
      icon: communitySupportIcon,
      title: "Community Support",
      description:
        "Our active community is here to support your every step of your Sodality journey offering your complete peace of mind.",
    },
    {
      icon: noCommissionIcon,
      title: "No Commission, Ever",
      description:
        "Sodality takes no commission and will always be free, for the good of creators everywhere.",
    },
    {
      icon: freeSpeechIcon,
      title: "Free Speech",
      description:
        "Creativity and free speech is a human right, Sodality is an open platform, welcome to all.",
    },
    {
      icon: decentralizedIcon,
      title: "Decentralized",
      description:
        "Sodality is built upon Dash Platform, everything is securely stored on the Dash network.",
    },
  ];

  type CardItemProps = {
    icon: StaticImageData;
    title: string;
    description: string;
  };

  const CardItem = ({ icon, title, description }: CardItemProps) => {
    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <Image src={icon} alt={title} width={30} height={30} />
        </div>
        <H4 className="text-secondary my-4">{title}</H4>
        <P1 className="text-center">{description}</P1>
      </div>
    );
  };

  return (
    <section className="py-28">
      <div className="md:w-[90%] mx-auto  px-6">
        {/* top - heading */}
        <div className="text-center space-y-2">
          <H2 className="text-secondary">Let&rsquo;s Break It Down</H2>
          <P1 className="">
            A quick look at the features you&rsquo;re going to love.
          </P1>
        </div>
        {/* bottom - cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {cards.map((card, index) => (
            <CardItem
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialSection = () => {
  return (
    <section className="py-14 bg-primaryGradient">
      <div className="md:w-[90%] mx-auto  px-6 flex items-center gap-20">
        {/* left - image */}
        <div className="text-center space-y-2 hidden md:block">
          <Image
            src={joelImage}
            alt="Joel Valenzuela"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        {/* right - info */}
        <div className="">
          <H4 className="mb-4">
            &rdquo;Really easy to use, lots of useful tools for communicating
            with my supporters and best of all, commission free. If you&rsquo;re
            hesitating, don&rsquo;t - get on board!&rdquo;
          </H4>
          <H4 className="text-tertiary font-semibold mb-1">Joel Valenzuela</H4>
          <SubH1 className="text-tertiary">@TheDesertLynx</SubH1>
        </div>
      </div>
    </section>
  );
};

const YourContentSection = () => {
  const cards = [
    {
      icon: contentDiversityIcon,
      title: "Content Diversity",
      description: "Whatever form your content takes, showcase it on Sodality.",
    },
    {
      icon: supporterTierIcon,
      title: "Supporter Tiers",
      description:
        "Let your supporters choose the level they feel most comfortable with.",
    },
    {
      icon: lockedOrUnlockedIcon,
      title: "Locked or Unlocked",
      description:
        "Public or private, any content can be easily gated to your supporters.",
    },
  ];

  return (
    <section className="py-28">
      <div className="md:w-[90%] mx-auto  px-6">
        {/* top - heading */}
        <div className="text-center space-y-2">
          <H2 className="text-secondary">Your Content, Your Way</H2>
          <P1 className="">
            Video, Audio, Pictures, Text - Locked or open, you decide.
          </P1>
        </div>
        {/* bottom - cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="flex flex-col items-center">
            <div className="flex justify-center">
              <Image
                src={cards[0].icon}
                alt={cards[0].title}
                width={200}
                height={200}
              />
            </div>
            <H4 className="text-secondary mt-5 mb-1">{cards[0].title}</H4>
            <P1 className="text-center">{cards[0].description}</P1>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-center">
              <Image
                src={cards[1].icon}
                alt={cards[1].title}
                width={150}
                height={150}
              />
            </div>
            <H4 className="text-secondary mt-5 mb-1">{cards[1].title}</H4>
            <P1 className="text-center">{cards[1].description}</P1>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-center">
              <Image
                src={cards[2].icon}
                alt={cards[2].title}
                width={100}
                height={100}
              />
            </div>
            <H4 className="text-secondary mt-5 mb-1">{cards[2].title}</H4>
            <P1 className="text-center">{cards[2].description}</P1>
          </div>
        </div>
      </div>
    </section>
  );
};
