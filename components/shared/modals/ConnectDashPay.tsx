import logo from "@/assets/logo.png";
import qrCode from "@/assets/qr.png";
import { H4, P1 } from "@/components/typography";
import Image from "next/image";
import Button from "../Button";

const ConnectDashPay = () => {
  return (
    <div className="px-5 pb-5 ">
      {/* top  */}
      <div className="pb-10 border-b border-b-appGray-400 flex flex-col md:flex-row gap-4 md:gap-0 justify-between ">
        {/* left  */}
        <div className="">
          <Image src={logo} alt="logo" width={100} height={100} />
          <P1 className="mt-3 mb-6">
            Sodality is part of the Dash Platform ecosystem. Use your Dash{" "}
            <br />
            Identity to sign up and log in.
          </P1>
          <div className="">
            <Button
              className="w-fit px-8 py-3"
              variant="primary"
              type="button"
              action={() => {}}
            >
              Connect DashPay
            </Button>
          </div>
        </div>
        {/* right - qr code */}
        <div className="flex items-center justify-center w-[40%] md:w-1/3">
          <Image src={qrCode} alt="qr code" width={100} height={100} />
        </div>
      </div>
      {/* bottom  */}
      <div className="mt-8">
        <H4 className="text-secondary font-semibold">
          Don&apos;t have a Dash Identity?
        </H4>
        <P1 className="mt-1 mb-6">
          No problem, it&apos;s easy and free to get started, you&apos;ll be up
          and running in just 1 minute and you can use your identity across the
          whole network.
        </P1>
        <div className="">
          <Button
            className="w-fit px-8 py-3"
            variant="primary"
            type="button"
            action={() => {}}
          >
            Get My Dash Identity
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectDashPay;
