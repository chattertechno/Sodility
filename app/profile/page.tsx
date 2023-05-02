"use client";
import { ReactNode, useEffect, useState } from "react";
import React from "react";
import { Form, Formik } from "formik";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Yup from "yup";

// COMPONENTS ========================================
import { FormControl } from "@/components/form";
import { Button } from "@/components/shared";
import { H5, P1 } from "@/components/typography";

// ASSETS ===========================================
import gearIcon from "@/assets/gear.svg";
import { default as userPlaceholder } from "@/assets/index/avatar.png";
import { FaRegBell, FaRegUserCircle } from "react-icons/fa";
import { HiOutlineLockClosed } from "react-icons/hi2";

// REDUX ============================================
import { openModal } from "@/context/features/modal/modalSlice";
import { useAppDispatch } from "@/context/hooks";
import { getProfileApi } from "../../http";
import { getLocaleData } from "../../service/authService";

import { getUserProfile } from '../api/admin/dashboard'
// ==========================================================
// PROFILE PAGE COMPONENT =================================
// ==========================================================
export default function ProfilePage() {
  const [user , setUser] = useState(null)
  const api = async ()=>{
    const token = getLocaleData("token") as any
    const _user = await getProfileApi(token)
    setUser(_user)
  }
  useEffect(()=>{
    api()
  },[])
  if(!user) return null
  return (
    <section className="md:py-14 py-8 pb-24 md:w-[90%] mx-auto  px-6 flex flex-col md:flex-row gap-8">
      {/* left - info  */}
      <div className="md:w-[30%] space-y-8">
        <UserSettingsLinks />
        <CreatorSettingsLink />
      </div>

      {/* right - content  */}
      <div className="flex-1 space-y-8">
        <ProfileSettings  />
        <NotificationSettings />
        <SecuritySettings />
      </div>
    </section>
  );
}

// EXTENDED COMPONENTS ====================================

const CreatorSettingsLink = () => {
  return (
    <div className="flex justify-center rounded border border-appGray-450 hover:shadow-sm p-3 px-4">
      <div className="flex items-center gap-2">
        <div className="">
          <Image src={gearIcon} alt="gear icon" width={18} height={18} />
        </div>
        <P1 className={`hover:text-primary w-full h-full`}>
          <Link href="/">Creator Settings</Link>
        </P1>
      </div>
    </div>
  );
};

const UserSettingsLinks = () => {
  const LinkItem = ({
    icon,
    title,
    link,
  }: {
    icon: ReactNode;
    title: string;
    link: Url;
  }) => {
    const pathname = usePathname();
    const active = pathname === link && "text-primary";
    return (
      <div
        className={` p-3 px-4  flex gap-2 items-center hover:text-primary ${active}`}
      >
        <div className="">{icon}</div>
        <P1 className={`hover:text-primary w-full h-full ${active}`}>
          <Link href={link}>{title}</Link>
        </P1>
      </div>
    );
  };
  return (
    <div className="rounded border border-appGray-450 hover:shadow-sm">
      {/* title  */}
      <div className="border-b p-3 border-b-appGray-450 flex gap-2 items-center">
        <H5>User Settings</H5>
      </div>
      {/* links   */}
      <div>
        <LinkItem
          icon={<FaRegUserCircle className="" />}
          title="My Profile"
          link="/profile"
        />
        <LinkItem
          icon={<FaRegBell className="" />}
          title="Notifications"
          link="/notifications"
        />
        <LinkItem
          icon={<HiOutlineLockClosed className="" />}
          title="Security"
          link="/security"
        />
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const [user, setUser] = React.useState<any>({})
  const [loadingProfile, setLoadingProfile] = React.useState<boolean>(true)
  useEffect(() => {
    getUserProfile().then((res: any) => {
      if(res.data.status === 200 && res.data.msg === 'success') {
        setLoadingProfile(false)
        setUser(res.data.data)
      } else {
        setLoadingProfile(false)
        alert("Unable to fetch user profile")
        console.log('error')
      }
    })
  }, [])
  return (
    <div className="rounded border border-appGray-450 hover:shadow-sm">
      {/* title  */}
      <div className="border-b p-3 border-b-appGray-450 flex gap-2 items-center">
        <H5>Profile Settings</H5>
      </div>
      {/* links   */}
      <div className="px-5 md:px-10 py-5 space-y-5">
        <div className="flex gap-5">
          <P1 className="text-black">Username: </P1>
          <P1 className="">{user?.username} </P1>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-56 flex items-center gap-5">
            <P1 className="text-black">User photo: </P1>
            <Image
              src={user.avatar}
              alt="user placeholder"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="rounded bg-appGray-400 p-3">
            <P1>
              Your username and profile photo are managed from your Dash
              account. <span className="text-primary">More info</span>
            </P1>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  const initialValues = {
    email: "",
    supporterAlerts: false,
    weeklyTips: false,
    supporterSummary: false,
    cryptoAlerts: false,
  };

  

  const handleSubmit = (values: any) => {
    alert("Submitted");
    console.log("Values: ", values);
  };

  return (
    <div className="rounded border border-appGray-450 hover:shadow-sm">
      {/* title  */}
      <div className="border-b p-3 border-b-appGray-450 flex gap-2 items-center">
        <H5>Notifications Settings</H5>
      </div>
      {/* links   */}
      <div>
        <Formik
          initialValues={initialValues}
          
          onSubmit={handleSubmit}
        >
          {formik => (
            <Form className="px-5 md:px-10 py-5 space-y-5">
              <div className="flex items-center gap-5">
                <P1 className="text-black">Email address: </P1>
                <FormControl
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  control="input"
                  label={""}
                />
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-5">
                  <P1 className="text-black">Send Me: </P1>
                  {/* create a checkbox group */}
                  <div className="flex flex-col gap-2">
                    <FormControl
                      name="supporterAlerts"
                      type="checkbox"
                      control="checkbox"
                      label="New supporter alerts"
                    />
                    <FormControl
                      name="weeklyTips"
                      type="checkbox"
                      control="checkbox"
                      label="Weekly tips to help me gain more supporters"
                    />
                    <FormControl
                      name="supporterSummary"
                      type="checkbox"
                      control="checkbox"
                      label="Weekly supporter summary"
                    />
                    <FormControl
                      name="cryptoAlerts"
                      type="checkbox"
                      control="checkbox"
                      label="New crypto support alerts (so you can add your payout address)"
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" action={formik.handleSubmit}>
                Save changes
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="rounded border border-appGray-450 hover:shadow-sm">
      {/* title  */}
      <div className="border-b p-3 border-b-appGray-450 flex gap-2 items-center">
        <H5>Security Settings</H5>
      </div>
      {/* links   */}
      <div className="px-5 md:px-10 py-5 space-y-5">
        <P1>Enable two-factor authentication to secure your account</P1>
        <Button
          action={() => {
            dispatch(openModal("2FA"));
          }}
        >
          Setup 2FA
        </Button>
      </div>
    </div>
  );
};
