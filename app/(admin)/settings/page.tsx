"use client";
import { ReactNode, useEffect } from "react";
import React from "react";
import { Form, Formik } from "formik";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// COMPONENTS ========================================
import { FormControl } from "@/components/form";
import { Button } from "@/components/shared";
import { H5, P1 } from "@/components/typography";

// ASSETS ===========================================
import banner from "@/assets/creator/banner.png";
import { default as userPlaceholder } from "@/assets/index/avatar.png";
import { BsCloudUpload } from "react-icons/bs";
import {
  FaRegBell,
  FaRegSun,
  FaRegTrashAlt,
  FaRegUserCircle,
  FaUserFriends,
} from "react-icons/fa";
import { HiOutlineLockClosed } from "react-icons/hi2";

// REDUX ============================================
import { openModal } from "@/context/features/modal/modalSlice";
import { useAppDispatch } from "@/context/hooks";

// API ==============================================
import { getUserProfile } from '../../api/admin/dashboard'
import { getNotificationSetting, updateNotificationSetting, updateUserProfile } from '../../api/admin/settings'
// ==========================================================
// PROFILE PAGE COMPONENT =================================
// ==========================================================
export default function CreatorSettingsPage() {
  return (
    <section className="md:py-14 py-8 pb-24 md:w-[90%] mx-auto  px-6 flex flex-col md:flex-row gap-8">
      {/* left - info  */}
      <div className="md:w-[30%] space-y-8">
        <CreatorSettingsLinks />
        <UserSettingsLink />
      </div>

      {/* right - content  */}
      <div className="flex-1 space-y-8">
        <ProfileSettings />
        <NotificationSettings />
        <PaymentSettings />
        <SupportersTier />
        <SecuritySettings />
      </div>
    </section>
  );
}

// EXTENDED COMPONENTS ====================================

const UserSettingsLink = () => {
  return (
    <div className="flex justify-center rounded border border-appGray-450 hover:shadow-sm p-3 px-4">
      <div className="flex gap-2">
        <Link
          href="/"
          className={`hover:text-primary w-full h-full flex gap-2 items-center`}
        >
          <FaRegUserCircle className="" />
          <P1>User Settings</P1>
        </Link>
      </div>
    </div>
  );
};

const CreatorSettingsLinks = () => {
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
        <H5>Creator Settings</H5>
      </div>
      {/* links   */}
      <div>
        <LinkItem
          icon={<FaRegUserCircle className="" />}
          title="Creator Page"
          link="/settings"
        />
        <LinkItem
          icon={<FaRegBell className="" />}
          title="Creator Notifications"
          link="#"
        />
        <LinkItem
          icon={<FaRegSun className="" />}
          title="Payment Settings"
          link="#"
        />
        <LinkItem
          icon={<FaUserFriends className="" />}
          title="Supporters Tiers"
          link="#"
        />
        <LinkItem
          icon={<HiOutlineLockClosed className="" />}
          title="Creator Security Settings"
          link="#"
        />
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const categories = [
    "Writers & Journalists",
    "Gaming Creators",
    "Video Creators",
    "Musicians",
    "Visual Artists",
    "Communities",
    "Podcasters",
    "Tutorials & Education",
    "Local Business",
    "Non-Profits",
  ]

  const defaultCat = categories.reduce((acc: any, curr: any, index: any)=>{
    acc[`category_${index}`] = false; return acc
  }, {})
  const [user, setUser] = React.useState<any>({
...defaultCat
  })
  const [loadingProfile, setLoadingProfile] = React.useState<boolean>(true)
  useEffect(() => {
    getUserProfile().then((res: any) => {
      if(res?.data?.status === 200 && res?.data?.msg === 'success') {
        setLoadingProfile(false)
      
        const catKeys = res?.data?.data?.categories || []
        const catHas = categories.reduce((acc: any, curr: any, index: any)=>{
          acc[`category_${index}`] = catKeys.includes(curr); return acc
        }, {})
        setUser({...res.data.data, ...catHas})
      } else {
        setLoadingProfile(false)
        alert("Unable to fetch user profile")
        console.log('error')
      }
    })
  }, [])

  const handleSubmit = (values: any) => {
    const selectCategories = categories.filter((item, index) => { if(values[`category_${index}`]){return categories[index]}  } )
    values.categories = selectCategories;
    updateUserProfile(values).then((res: any) => {
      if(res?.data?.status === 200) {
        alert("Profile updated successfully")
      } else {
        alert("Unable to update profile")
        console.log('error')
      }
    })
  }
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
          <P1 className="">{user.username}</P1>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-56 flex items-center gap-5">
            <P1 className="text-black">User photo: </P1>
            <Image
              src={user.avatar || userPlaceholder}
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
        <div className="space-y-1">
          <P1 className="text-black">Header Image: </P1>
          <div className="relative">
            <Image src={banner} alt="banner" className="rounded-md" />
            <div className="absolute top-2 right-2 flex gap-2">
              <button className="bg-slate-600 rounded p-1.5">
                <FaRegTrashAlt className="text-white w-2.5 h-2.5" />
              </button>
              <button className="bg-primary rounded p-1.5">
                <BsCloudUpload className="text-white w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>

        {loadingProfile ? <div>loading...</div>: (
        <Formik initialValues={user} onSubmit={handleSubmit}>
          {formik => (
            <Form className="px-5 md:px-10 py-5 space-y-5">
              <div className="">
                <P1 className="text-black">Title: </P1>
                <FormControl
                  name="title"
                  type="text"
                  placeholder="Enter your email"
                  control="input"
                  label={""}
                />
              </div>

              <div className="">
                <P1 className="text-black">Subtitle: </P1>
                <FormControl
                  name="subtitle"
                  type="text"
                  placeholder="Enter your email"
                  control="input"
                  label={""}
                />
              </div>

              <div className="">
                <P1 className="text-black">Description: </P1>
                <FormControl
                  name="description"
                  type="textarea"
                  placeholder="Enter your email"
                  control="input"
                  label={""}
                />
              </div>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="space-y-1 flex-1">
                    <P1 className="text-black">Facebook: </P1>
                    <FormControl
                      name="facebook"
                      type="textarea"
                      placeholder="https://www.facebook.com/DashPay/"
                      control="input"
                      label={""}/>
                  </div>
                  <div className="space-y-1 flex-1">
                    <P1 className="text-black">Twitter: </P1>
                    <FormControl
                      name="twitter"
                      type="textarea"
                      placeholder="https://twitter.com/dashincubator"
                      control="input"
                      label={""}/>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1 flex-1">
                    <P1 className="text-black">Youtube: </P1>
                    <FormControl
                      name="youtube"
                      type="textarea"
                      placeholder="https://www.youtube.com/channel/UCA"
                      control="input"
                      label={""}/>
                  </div>
                  <div className="space-y-1 flex-1">
                    <P1 className="text-black">Odysee: </P1>
                    <FormControl
                      name="odysee"
                      type="textarea"
                      placeholder="https://odysee.com/@DigitalCashNetwo"
                      control="input"
                      label={""}/>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-5">
                  {/* create a checkbox group */}
                  <div className="flex flex-col gap-2">
                    <P1 className="text-black">Creator Categories: </P1>
                    {
                      categories.map((category, index) => (
                        <FormControl
                          key={index}
                          name={`category_${index}`}
                          type="checkbox"
                          control="checkbox"
                          label={category}
                    />))
                    }
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" action={formik.handleSubmit}>
                  Save changes
                </Button>
              </div>

            </Form>
          )}
        </Formik>)}

     
      </div>
    </div>
  );
};

const NotificationSettings = () => {

  const [loadingProfile, setLoadingProfile] = React.useState(true)
  const [user, setUser] = React.useState<any>({
      email: "",
      supporterAlerts: false,
      weeklyTips: false,
      supporterSummary: false,
      cryptoAlerts: false,
  })

  useEffect(() => {
    getNotificationSetting().then((res: any) => {
      if(res.data?.status === 200 && res.data?.msg === 'success') {
        setUser({
          email: res.data?.data?.email || "",
          supporterAlerts: res.data?.data?.new_supporters_alerts || false,
          weeklyTips: res.data?.data?.weekly_tips || false,
          supporterSummary: res.data?.data?.weekly_supporter_summary || false,
          cryptoAlerts: res.data?.data?.new_crypto_support || false,
        })
        setLoadingProfile(false)
      } else {
        setLoadingProfile(false)
        alert("Unable to fetch user profile")
        console.log('error')
      }
    })
  }, [])

  

  const handleSubmit = (values: any) => {
    const data = { email: values.email,
      new_supporters_alerts: values.supporterAlerts,
      weekly_tips: values.weeklyTips,
      weekly_supporter_summary: values.supporterSummary,
      new_crypto_support: values.cryptoAlerts
    }

    updateNotificationSetting(data).then((res: any) => {
      if(res.data?.status === 200) {
        alert("Notification settings updated successfully");
      } else {
        alert("Unable to update notification settings")
        console.log('error')
      }
    })
  };

  return (
    <div className="rounded border border-appGray-450 hover:shadow-sm">
      {/* title  */}
      <div className="border-b p-3 border-b-appGray-450 flex gap-2 items-center">
        <H5>Notifications Settings</H5>
      </div>
      {/* links   */}
      {loadingProfile ?(<>Loading...</>):
      <div>
        <Formik initialValues={user} onSubmit={handleSubmit}>
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
}

    </div>
  );
};

const PaymentSettings = () => {
  const initialValues = {
    bitcoin: { address: "", enabled: false },
    dash: { address: "", enabled: false },
  };

  const handleSubmit = (values: any) => {
    alert("Submitted");
  };

  return (
    <div className="rounded border border-appGray-450 hover:shadow-sm">
      {/* title  */}
      <div className="border-b p-3 border-b-appGray-450 flex gap-2 items-center">
        <H5>Payment Settings</H5>
      </div>
      {/* links   */}
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {formik => (
            <Form className="px-5 md:px-10 py-5 space-y-5">
              <div className="flex items-center gap-5">
                <P1 className="text-black">Bitcoin: </P1>
                <div className="w-[80%]">
                  <FormControl
                    name="bitcoin.address"
                    type="text"
                    placeholder="..."
                    control="input"
                    label={""}
                  />
                </div>
                <FormControl
                  name="bitcoin.enabled"
                  type="checkbox"
                  control="checkbox"
                  label="Enabled"
                />
              </div>
              <div className="flex items-center gap-5">
                <P1 className="text-black">Dash: </P1>
                <div className="w-[80%]">
                  <FormControl
                    name="dash.address"
                    type="text"
                    placeholder="..."
                    control="input"
                    label={""}
                  />
                </div>
                <FormControl
                  name="dash.enabled"
                  type="checkbox"
                  control="checkbox"
                  label="Enabled"
                />
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

const SupportersTier = () => {
  const initialValues = {
    tier1: { name: "", amount: "" },
    tier2: { name: "", amount: "" },
    tier3: { name: "", amount: "" },
  };

  const handleSubmit = (values: any) => {
    alert("Submitted");
    console.log("Values: ", values);
  };

  return (
    <div className="rounded border border-appGray-450 hover:shadow-sm">
      {/* title  */}
      <div className="border-b p-3 border-b-appGray-450 flex gap-2 items-center">
        <H5>Supporter Tiers</H5>
      </div>
      {/* links   */}
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {formik => (
            <Form className="px-5 md:px-10 py-5 space-y-5">
              <div className="flex items-center gap-5">
                <div className="flex-1">
                  <P1 className="text-black">Tier 1 Name: </P1>

                  <FormControl
                    name="tier1.name"
                    type="text"
                    placeholder="..."
                    control="input"
                    label={""}
                  />
                </div>
                <div className="flex-1">
                  <P1 className="text-black">Amount(USD): </P1>

                  <FormControl
                    name="tier1.amount"
                    type="text"
                    placeholder="..."
                    control="input"
                    label={""}
                  />
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex-1">
                  <P1 className="text-black">Tier 2 Name: </P1>

                  <FormControl
                    name="tier2.name"
                    type="text"
                    placeholder="..."
                    control="input"
                    label={""}
                  />
                </div>
                <div className="flex-1">
                  <P1 className="text-black">Amount(USD): </P1>

                  <FormControl
                    name="tier2.amount"
                    type="text"
                    placeholder="..."
                    control="input"
                    label={""}
                  />
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex-1">
                  <P1 className="text-black">Tier 3 Name: </P1>

                  <FormControl
                    name="tier3.name"
                    type="text"
                    placeholder="..."
                    control="input"
                    label={""}
                  />
                </div>
                <div className="flex-1">
                  <P1 className="text-black">Amount(USD): </P1>

                  <FormControl
                    name="tier3.amount"
                    type="text"
                    placeholder="..."
                    control="input"
                    label={""}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" action={formik.handleSubmit}>
                  Save changes
                </Button>
              </div>
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
