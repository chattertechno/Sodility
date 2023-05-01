// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })
"use client";
import Image, { StaticImageData } from "next/image";

// COMPONENTS
import { Button, CreatorsCard } from "@/components/shared";
import { H1, H2, H4, P1 } from "@/components/typography";

// ASSETS
import cardUserImgPlaceholder from "@/assets/index/avatar.png";
import creativeCard1img from "@/assets/index/creativity-1.png";
import creativeCard2img from "@/assets/index/creativity-2.png";
import creativeCard3img from "@/assets/index/creativity-3.png";
import creativityImg from "@/assets/index/creativity.png";
import heroImg from "@/assets/index/hero.png";

// Redux - Context
import { openModal } from "@/context/features/modal/modalSlice";
import { useAppDispatch } from "@/context/hooks";

// ===================================================
// HOME PAGE COMPONENT ===============================
// ===================================================
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CreativityWithoutCompromise />
      <PopularCreators />
      <CreatorFeedBack />
    </main>
  );
}

// EXTENDED COMPONENTS =================================
function HeroSection() {
  const dispatch = useAppDispatch();

  return (
    <section className="bg-gradient-to-b from-white to-primaryGradient h-[65vh] md:h-[100vh]">
      <div className="md:w-[90%] mx-auto  px-6 h-full flex flex-col md:flex-row md:items-center">
        {/* left - info */}
        <div className="md:w-[50%] flex flex-col justify-center h-full gap-4">
          <H1 className="text-secondary">
            A Better Way To Fund Your Creative Work
          </H1>
          <P1>
            Reclaim your creative freedom, let your fans support you directly,
            commission-free.
          </P1>
          <Button
            className="w-fit px-10 py-3 mt-4"
            variant="primary"
            type="button"
            action={() => {
              dispatch(openModal("connectDashPay"));
            }}
          >
            Connect DashPay
          </Button>
        </div>
        {/* right - image  */}
        <div className="md:w-[50%] hidden md:block">
          <Image
            src={heroImg}
            className="mx-auto"
            alt="hero"
            width={500}
            height={400}
          />
        </div>
      </div>
    </section>
  );
}

const CreativityWithoutCompromise = () => {
  const cardData = [
    {
      img: creativeCard1img,
      title: "Commision Free",
      desc: "No comission, ever. Sodality is provided for free, for the good of creators everywhere.",
    },
    {
      img: creativeCard2img,
      title: "Free Speech",
      desc: "Creativity and free speech is a human right, Sodality is an open platform, welcome to all.",
    },
    {
      img: creativeCard3img,
      title: "Commision Free",
      desc: "Sodality is build upon Dash Platform, everything is securely stored on the Dash network.",
    },
  ];
  const Card = ({
    img,
    title,
    description,
  }: {
    img: StaticImageData;
    title: string;
    description: string;
  }) => {
    return (
      <div className="flex gap-8">
        <div className="pt-3 md:pt-2">
          <Image src={img} alt={title} width={60} />
        </div>
        <div className="space-y-2">
          <H4 className="text-secondary">{title}</H4>
          <P1>{description}</P1>
        </div>
      </div>
    );
  };

  return (
    <section className="py-28 md:w-[90%] mx-auto  px-6 flex flex-col items-center gap-20">
      {/* top - headings  */}
      <div className="text-center space-y-2">
        <H2 className="text-secondary">Creativity Without Compromise</H2>
        <P1>
          Sodality is decentralized, open source and censorship free; never fear
          deplatforming again.
        </P1>
      </div>
      {/* bottom - cards  */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-4">
        {/* left - illustration   */}
        <div className="md:w-[50%] md:pr-10">
          <Image src={creativityImg} alt="creative illustration" />
        </div>
        <div className="md:w-[50%] flex items-center md:pl-10">
          <div className="space-y-10">
            {cardData.map((card, i) => (
              <Card
                key={i}
                img={card.img}
                title={card.title}
                description={card.desc}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PopularCreators = () => {
  return (
    <section className="bg-black-pattern py-28">
      <div className="md:w-[90%] mx-auto  px-6">
        {/* top - heading  */}
        <div className="text-center space-y-2">
          <H2 className="text-white">Popular Creators</H2>
          <P1 className="text-white">
            See how they use Sodality to reach their audience.
          </P1>
        </div>
        {/* bottom - cards  */}
        <div className="flex items-center justify-center flex-col md:flex-row gap-10 mt-14 md:mt-20">
          <CreatorsCard
            img={cardUserImgPlaceholder}
            username="TheDesertLynx"
            title="Digital Cash Network"
            description="Interviews, news breakdowns, and more about the exciting world of crypto..."
            supporters={100}
          />
          <CreatorsCard
            img={cardUserImgPlaceholder}
            username="TheDesertLynx"
            title="Digital Cash Network"
            description="Interviews, news breakdowns, and more about the exciting world of crypto..."
            supporters={100}
          />
          <CreatorsCard
            img={cardUserImgPlaceholder}
            username="TheDesertLynx"
            title="Digital Cash Network"
            description="Interviews, news breakdowns, and more about the exciting world of crypto..."
            supporters={100}
          />
        </div>
      </div>
    </section>
  );
};

const CreatorFeedBack = () => {
  const FeedBackCard = ({
    img,
    username,
    name,
    description,
  }: {
    img: StaticImageData;
    username: string;
    name: string;
    description: string;
  }) => {
    return (
      <div className="p-10 rounded border hover:shadow border-appGray-400 md:w-1/3 space-y-8">
        <P1>{description}</P1>
        <div className="text-center">
          <Image
            src={img}
            alt={username}
            width={40}
            height={40}
            className="rounded-full mx-auto mb-3"
          />
          <H4 className="">{name}</H4>
          <P1 className="">@{username}</P1>
        </div>
      </div>
    );
  };

  return (
    <section className=" py-28">
      <div className="md:w-[90%] mx-auto px-6">
        {/* top - heading  */}
        <div className="text-center space-y-2">
          <H2 className="text-secondary">Creator Feedback</H2>
          <P1>Don&apos;t just take our word for it.</P1>
        </div>
        {/* bottom - cards  */}
        <div className="flex flex-col md:flex-row items-center  gap-10 mt-14 md:mt-20 md:px-6">
          <FeedBackCard
            img={cardUserImgPlaceholder}
            username="TheDesertLynx"
            name="Joel Valenzuela"
            description="Really easy to use, lots of useful tools for communicating with my supporters and best of all, commission free. If you're hesitating, don't - get on board!"
          />
          <FeedBackCard
            img={cardUserImgPlaceholder}
            username="TheDesertLynx"
            name="Joel Valenzuela"
            description="Really easy to use, lots of useful tools for communicating with my supporters and best of all, commission free. If you're hesitating, don't - get on board!"
          />
          <FeedBackCard
            img={cardUserImgPlaceholder}
            username="TheDesertLynx"
            name="Joel Valenzuela"
            description="Really easy to use, lots of useful tools for communicating with my supporters and best of all, commission free. If you're hesitating, don't - get on board!"
          />
        </div>
      </div>
    </section>
  );
};
