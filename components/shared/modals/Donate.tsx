import Image, { StaticImageData } from "next/image";
import { useState } from "react";

// COMPONENTS
import { H4, H5, SubH2 } from "@/components/typography";
import Button from "../Button";

// ASSETS
import fanIcon from "@/assets/creator/fan.png";
import oneOffIcon from "@/assets/creator/one-off.png";
import superFanIcon from "@/assets/creator/super-fan.png";
import supporterIcon from "@/assets/creator/supporter.png";
// logos
import bitcoinLogo from "@/assets/bitcoin.svg";
import dashLogo from "@/assets/dash.svg";
// pay
import qrIcon from "@/assets/qr.png";
import timeIcon from "@/assets/time.svg";

// =============================================
// DONATE MODAL COMPONENT ====================
// =============================================
const Donate = () => {
  return (
    <div className="md:px-5 pb-5">
      <H5 className="text-secondary">
        Support Joël Valenzuela (TheDesertLynx)
      </H5>
      {/* price  */}
      <SupportSection />
      {/* bottom  */}
      <div className="flex flex-col md:flex-row border border-appGray-450 rounded">
        {/* left - currencies */}
        <div className="md:w-56">
          <div className="border-b p-2 px-3 border-b-appGray-450 flex gap-2 items-center">
            <Image src={dashLogo} alt="dash logo" width={30} height={30} />
            <div className="">
              <H5>Dash</H5>
              <SubH2 className="-mt-1 text-gray-400">0.00000000</SubH2>
            </div>
          </div>
          <div className="border-b p-2 px-3 border-b-appGray-450 flex gap-2 items-center">
            <Image src={bitcoinLogo} alt="dash logo" width={30} height={30} />
            <div className="">
              <H5>Bitcoin</H5>
              <SubH2 className="-mt-1 text-gray-400">0.00000000</SubH2>
            </div>
          </div>
        </div>
        {/* right - payment  */}
        <div className="border-l border-l-appGray-450 py-8 flex-1 ">
          <H5 className="text-center text-secondary">Complete Payment</H5>
          <div className="md:w-[60%] px-6 md:px-0 mx-auto mt-4 space-y-3">
            <div className="flex justify-between">
              <SubH2 className="font-semibold">$1.00 = 0.0033527 Dash</SubH2>
              <SubH2 className="text-gray-400 flex items-center gap-1">
                <Image src={timeIcon} alt="time icon" width={20} height={20} />
                <span>03:29</span>{" "}
              </SubH2>
            </div>
            <Image src={qrIcon} alt="qr code" width={500} height={500} />
            {/* button  */}
            <div className="flex justify-center mt-4">
              <Button
                className="w-[60%] text-center !mt-8"
                action={() => console.log("clicked")}
              >
                Open Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;

// EXTENDED COMPONENTS =================================
const SupportSection = () => {
  const [selectedSupport, setSelectedSupport] = useState("supporter");

  const Card = ({
    img,
    width = 100,
    title,
    amount,
    subH = true,
  }: {
    img: StaticImageData;
    width?: number;
    title: string;
    amount: string;

    subH?: boolean;
  }) => {
    return (
      <div
        onClick={() => setSelectedSupport(title)}
        className={`rounded border ${
          selectedSupport === title ? "border-primary" : "border-appGray-450"
        } py-3 px-5 w-full md:w-96 hover:shadow-sm flex justify-center cursor-pointer`}
      >
        <div className="w-14 flex flex-col items-center gap-4 my-">
          <Image
            src={img}
            alt={title + " icon"}
            width={width}
            // className="rounded-full p-1 border border-appGray-400"
          />
          <div className="space-y-1 mb-2">
            <SubH2 className="capitalize">{title}</SubH2>
            <H4>{amount}</H4>
            {subH && <SubH2 className="capitalize">per month</SubH2>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="my-5 flex flex-col md:flex-row gap-3 justify-between items-center text-center">
      <Card img={supporterIcon} title="supporter" amount="$1.00" />
      <Card img={fanIcon} width={42} title="fan" amount="$5.00" />
      <Card img={superFanIcon} width={38} title="super fan" amount="$10.00" />
      <Card
        img={oneOffIcon}
        width={53}
        title="one-off donation"
        amount=""
        subH={false}
      />
    </div>
  );
};
