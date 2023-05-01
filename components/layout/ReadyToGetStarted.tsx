"use client";
import { usePathname } from "next/navigation";

// Redux
import { openModal } from "@/context/features/modal/modalSlice";
import { useAppDispatch } from "@/context/hooks";

// Components
import { Button } from "../shared";
import { H2, P1 } from "../typography";

// EXTENDED COMPONENTS
const ReadyToGetStarted = () => {
  const pathname = usePathname();
  const connectedUser =
    pathname === "/supporter"
      ? true
      : pathname === "/creator-creator"
      ? true
      : false;

  const userType =
    pathname === "/supporter"
      ? "supporter"
      : pathname === "/creator-creator"
      ? "creator"
      : "public";

  return (
    <>
      {connectedUser && userType === "supporter" ? (
        <section className="bg-primaryGradient py-16 ">
          <FinishAccount />
        </section>
      ) : connectedUser && userType === "public" ? (
        <section className="bg-primaryGradient py-16 ">
          <ConnectAccount />
        </section>
      ) : userType === "public" ? (
        <section className="bg-primaryGradient py-16 ">
          <ConnectAccount />
        </section>
      ) : null}
    </>
  );
};

export default ReadyToGetStarted;

// EXTENDED COMPONENTS =================================
const FinishAccount = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="md:w-[90%] mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-0">
      {/* left - heading  */}
      <div className="space-y-2">
        <H2 className="">Ready to finish setting up your account?</H2>
        <P1 className="">
        Publish your creator page in just 30 seconds.
        </P1>
      </div>
      {/* right - button  */}
      <div className="flex md:justify-center">
        <Button
          variant="primary"
          action={() => {
            // dispatch(openModal("connectDashPay"));
          }}
          type="button"
          className=""
        >
          Continue Setup
        </Button>
      </div>
    </div>
  );
};
const ConnectAccount = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="md:w-[90%] mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-0">
      {/* left - heading  */}
      <div className="space-y-2">
        <H2 className="">Ready to get started?</H2>
        <P1 className="">
          Connect your DashPay account and get setup in 30 seconds.
        </P1>
      </div>
      {/* right - button  */}
      <div className="flex md:justify-center">
        <Button
          variant="primary"
          action={() => {
            dispatch(openModal("connectDashPay"));
          }}
          type="button"
          className=""
        >
          Connect DashPay
        </Button>
      </div>
    </div>
  );
};
