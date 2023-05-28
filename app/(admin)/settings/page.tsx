"use client";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
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
import { default as userPlaceholder } from "@/assets/avatar.png";
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
import { Loaders } from "@/ui-kits/Loaders";
import { errorToast, successToast } from "@/helper/toster";
import { getCreatorTiers, postSupporterTier } from "@/http/creatorApi";
import { getLocaleData, setLocaleData } from "@/service/localStorageService";
import { getProfileApi } from "@/http";
import { UploadContentForPost } from "@/http/contentApi";
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
        href="/profile"
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
        <P1 className={`hover:text-primary w-full h-full cursor-pointer ${active}`}>
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
          link="/settings#notificationsetting"
        />
        <LinkItem
          icon={<FaRegSun className="" />}
          title="Payment Settings"
          link="/settings#paymentsetting"
        />
        <LinkItem
          icon={<FaUserFriends className="" />}
          title="Supporters Tiers"
          link="/settings#supporterstier"
        />
        <LinkItem
          icon={<HiOutlineLockClosed className="" />}
          title="Creator Security Settings"
          link="/settings#securitysetting"
        />
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const categories = [{ 
    key: "writers-and-journalists",
    value: "Writers & Journalists"
  },
  {
    key: "gaming-creators",
    value: "Gaming Creators"
  },
  {
    key: "video-creators",
    value: "Video Creators"
  },
  {
    key: "musicians",
    value: "Musicians"
  },
  {
    key: "visual-artists",
    value: "Visual Artists"
  },
  {
    key: "communities",
    value: "Communities"
  },
  {
    key: "podcasters",
    value: "Podcasters"
  },
  {
    key: "tutorials-and-education",
    value: "Tutorials & Education"
  },
  {
    key: "Local Business",
    value: "local-business"
  },
  {
    key: "non-profits",
    value: "Non-Profits"
  }
  ]

  const token = getLocaleData("token");


  const defaultCat = categories.reduce((acc: any, curr: any, index: any)=>{
    acc[`category_${index}`] = false; return acc
  }, {})
  const [user, setUser] = React.useState<any>({
...defaultCat
  })
  const [loadingProfile, setLoadingProfile] = React.useState<boolean>(true);

  const [initialValues, setInitialValues] = useState<{title: string; subtitle: string; description: string; profile_image: string; header_image: string; categories: any}>({
    title: '',
    subtitle: '',
    description: '',
    profile_image: '',
    header_image: '',
    categories: []
  })

  const [userAvatar, setUserAvatar] = useState<string>('');
  const [userCoverPic, setUserCoverPic] = useState<string>('');

  useEffect(() => {
    getUserProfile().then((res: any) => {
      if(res?.data?.status === 200 && res?.data?.msg === 'success') {
        setLoadingProfile(false)
      
        const catKeys = res?.data?.data?.categories || []
        const catHas = categories.reduce((acc: any, curr: any, index: any)=>{
          acc[`category_${index}`] = catKeys.includes(curr); return acc
        }, {})
        setUser({...res.data.data, ...catHas})
        setInitialValues({...initialValues, title: res?.data.data.title, 
          subtitle: res?.data.data.subtitle, description: res?.data.data.description,
          profile_image: res?.data.data.profile_image, header_image: res?.data.data.header_image,
          categories: res?.data?.data.categories
        })
      } else {
        setLoadingProfile(false)
        alert("Unable to fetch user profile")
        console.log('error')
      }
    })
  }, []);

  const fileInputRef: any = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };


  const handleChangeCheckbox = (categoryKey: string, isChecked: boolean) => {
    if (isChecked) {
      setInitialValues(prevState => ({
        ...prevState,
        categories: [...prevState.categories, categoryKey]
      }));
    } else {
      setInitialValues(prevState => ({
        ...prevState,
        categories: prevState.categories.filter((key: any) => key !== categoryKey)
      }));
    }
  };

  const handleApiCall = (): void => {

    if (initialValues?.title && initialValues?.subtitle && initialValues?.description)
      updateUserProfile(initialValues).then((res: any) => {
        if(res?.data?.status === 200) {
          successToast("Profile updated successfully")
          getUserProfile().then((res) => {
            setInitialValues({...initialValues, title: res?.data.data.title, 
              subtitle: res?.data.data.subtitle, description: res?.data.data.description,
              profile_image: res?.data.data?.profile_image,
              header_image: res?.data?.data?.header_image,
              categories: res?.data?.data.categories

            })
            setLocaleData("user", res?.data.data);
        });
        } else {
          errorToast("Unable to update profile")
          console.log('error')
        }
      })
    else errorToast('Title, subtitle and description is required');
  }

  const handleSubmit = useCallback(() => {

      handleApiCall();
    
  }, [categories, initialValues]) 

    
  const handleFileChange= useCallback((event: any, picType: string) => {
    const file = event.target.files[0];

    const formData = new FormData();

    if (file) {
      formData.append('file', file);
      UploadContentForPost(formData, token).then((res) => {
        if (res) {
          if (picType === 'profile') {
            setInitialValues({...initialValues, profile_image: res})
            setUserAvatar(res);
          } else if (picType === 'cover') {
            setInitialValues({...initialValues, header_image: res})
            setUserCoverPic(res);
          }
        } 
       
      });
    }
    else {
      errorToast("Uploading Failed.")
    }
  }, [initialValues, token])  



return React.useMemo(() => {
  return (
    <div id="profilesetting" className="rounded border border-appGray-450 hover:shadow-sm">
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
            <label htmlFor="fileInput" className="rounded-full">
            <Image
                style={{ borderRadius: "50%", overflow: "hidden", width: "40px", height: "40px" }}
                src={userAvatar ? userAvatar : user?.profile_image ? user?.profile_image : userPlaceholder}
                alt="user placeholder"
                width={50}
                height={50}
                className="cursor-pointer"
              />
          </label>

          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'profile')}
            className="hidden"
            aria-hidden="true"
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
            <Image src={initialValues.header_image === '' ? banner : userCoverPic ? userCoverPic : user?.header_image ? user?.header_image : banner} width={900} height={200} alt="banner" className="rounded-md w-full max-h-32 object-fill" />
            <div className="absolute top-2 right-2 flex gap-2">
              <button onClick={() => setInitialValues({...initialValues, header_image: ''})} className="bg-slate-600 rounded p-1.5">
                <FaRegTrashAlt className="text-white w-2.5 h-2.5" />
              </button>
              <label htmlFor="fileInput">
                <button onClick={handleButtonClick} className="bg-primary rounded p-1.5">
                  <BsCloudUpload className="text-white w-2.5 h-2.5" />
                </button>
              </label>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'cover')}
                ref={fileInputRef}
                className="hidden"
                aria-hidden="true"
              />          
              </div>
          </div>
        </div>

        {loadingProfile ? <div><Loaders /></div>: (
        <Formik initialValues={user} onSubmit={handleSubmit}>
          {formik => (
            <Form className="px-5 md:px-10 py-5 space-y-5">
              <div className="">
                <P1 className="text-black">Title: </P1>
                <input type="text" placeholder="Title" value={initialValues?.title ? initialValues?.title : ''} onChange={(e) => setInitialValues({...initialValues, title: e.target.value})} className="w-full p-2 flex-1 bg-ban text-grapelight border border-appGray-450 hover:border-secondary transition duration-300 easeInOut rounded focus:outline-none focus:border-secondary placeholder:text-sm placeholder:text-grapeshade" />

              </div>

              <div className="">
                <P1 className="text-black">Subtitle: </P1>
                <input type="text" placeholder="Sub Title" value={initialValues?.subtitle ? initialValues?.subtitle : ''} onChange={(e) => setInitialValues({...initialValues, subtitle: e.target.value})} className="w-full p-2 flex-1 bg-ban text-grapelight border border-appGray-450 hover:border-secondary transition duration-300 easeInOut rounded focus:outline-none focus:border-secondary placeholder:text-sm placeholder:text-grapeshade" />

              </div>

              <div className="">
                <P1 className="text-black">Description: </P1>
                <input type="text" placeholder="Description" value={initialValues?.description ? initialValues?.description : ''} onChange={(e) => setInitialValues({...initialValues, description: e.target.value})} className="w-full p-2 flex-1 bg-ban text-grapelight border border-appGray-450 hover:border-secondary transition duration-300 easeInOut rounded focus:outline-none focus:border-secondary placeholder:text-sm placeholder:text-grapeshade" />

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
                      categories.map((category: any, index) => {

                        const isChecked = initialValues.categories.includes(category.key);                        return (
                          <div key={index}>
                            <input
                              type="checkbox"
                              id={category?.key}
                              name={category?.value}
                              checked={isChecked}
                              className="p-3"
                              onChange={(e) => handleChangeCheckbox(category?.key, e.target.checked)}
                            />
                            <label style={{color: 'rgb(57 62 73)'}} className="pl-3" htmlFor={category?.key}>{category?.value}</label>
                          </div>
                        )})
                    }
                  </div>
                </div>
              </div>

              <div className="flex justify-end ">
                <button type="submit" className="border border-primary py-3 px-5 rounded bg-blue-500 hover:bg-blue-500 text-white" onClick={() => formik.handleSubmit}>
                  Save changes
                </button>
              </div>

            </Form>
          )}
        </Formik>)}

     
      </div>
    </div>
  );
}, [categories, handleFileChange, handleSubmit, initialValues, loadingProfile, user, userAvatar, userCoverPic])
  
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
    <div id="notificationsetting" className="rounded border border-appGray-450 hover:shadow-sm">
      {/* title  */}
      <div className="border-b p-3 border-b-appGray-450 flex gap-2 items-center">
        <H5>Notifications Settings</H5>
      </div>
      {/* links   */}
      {loadingProfile ?(<><Loaders /></>):
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
    <div id="paymentsetting" className="rounded border border-appGray-450 hover:shadow-sm">
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
 
  const username = getLocaleData('user')?.username;


  const [initialValues, setInitialValues] = useState<any>({
    tier_one_name: "",
    tier_one_price: '',
    tier_two_name: "",
    tier_two_price: '',
    tier_three_name: "",
    tier_three_price: ''
  });

  useEffect(() => {
    getCreatorTiers(username).then((res) => {
      setInitialValues({
        tier_one_name: res?.tier_one_name,
        tier_one_price: res?.tier_one_price,
        tier_three_name: res?.tier_three_name,
        tier_three_price: res?.tier_three_price,
        tier_two_name: res?.tier_two_name,
        tier_two_price: res?.tier_two_price,
      });
    })
  }, [])

  const handleSubmit = () => {
    postSupporterTier(initialValues).then((res) => {
      if (res === 200) successToast('Tiers added to your profile');
      else errorToast('Something wrong has happened')
    })
  };

  return (
    <div id = "supporterstier" className="rounded border border-appGray-450 hover:shadow-sm">
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

                  <input type="text" placeholder="Tier 1 Name" value={initialValues?.tier_one_name ? initialValues?.tier_one_name : ''} onChange={(e) => setInitialValues({...initialValues, tier_one_name: e.target.value})} className="w-full p-2 flex-1 bg-ban text-grapelight border border-appGray-450 hover:border-secondary transition duration-300 easeInOut rounded focus:outline-none focus:border-secondary placeholder:text-sm placeholder:text-grapeshade" />
                </div>
                <div className="flex-1">
                  <P1 className="text-black">Amount(USD): </P1>

                  <input type="text" placeholder="Tier 1 Amount" value={initialValues?.tier_one_price ? initialValues?.tier_one_price : ''} onChange={(e) => setInitialValues({...initialValues, tier_one_price: parseFloat(e.target.value)})} className="w-full p-2 flex-1 bg-ban text-grapelight border border-appGray-450 hover:border-secondary transition duration-300 easeInOut rounded focus:outline-none focus:border-secondary placeholder:text-sm placeholder:text-grapeshade" />

                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex-1">
                  <P1 className="text-black">Tier 2 Name: </P1>

                  <input type="text" placeholder="Tier 1 Amount" value={initialValues?.tier_two_name ? initialValues?.tier_two_name : ''} onChange={(e) => setInitialValues({...initialValues, tier_two_name: e.target.value})} className="w-full p-2 flex-1 bg-ban text-grapelight border border-appGray-450 hover:border-secondary transition duration-300 easeInOut rounded focus:outline-none focus:border-secondary placeholder:text-sm placeholder:text-grapeshade" />

                </div>
                <div className="flex-1">
                  <P1 className="text-black">Amount(USD): </P1>

                  <input type="text" placeholder="Tier 1 Amount" value={initialValues?.tier_two_price ? initialValues?.tier_two_price : ''} onChange={(e) => setInitialValues({...initialValues, tier_two_price: parseFloat(e.target.value)})} className="w-full p-2 flex-1 bg-ban text-grapelight border border-appGray-450 hover:border-secondary transition duration-300 easeInOut rounded focus:outline-none focus:border-secondary placeholder:text-sm placeholder:text-grapeshade" />

                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex-1">
                  <P1 className="text-black">Tier 3 Name: </P1>

                  <input type="text" placeholder="Tier 1 Amount" value={initialValues?.tier_three_name ? initialValues?.tier_three_name : ''} onChange={(e) => setInitialValues({...initialValues, tier_three_name: e.target.value})} className="w-full p-2 flex-1 bg-ban text-grapelight border border-appGray-450 hover:border-secondary transition duration-300 easeInOut rounded focus:outline-none focus:border-secondary placeholder:text-sm placeholder:text-grapeshade" />

                </div>
                <div className="flex-1">
                  <P1 className="text-black">Amount(USD): </P1>

                  <input type="text" placeholder="Tier 1 Amount" value={initialValues?.tier_three_price ? initialValues?.tier_three_price : ''} onChange={(e) => setInitialValues({...initialValues, tier_three_price: parseFloat(e.target.value)})} className="w-full p-2 flex-1 bg-ban text-grapelight border border-appGray-450 hover:border-secondary transition duration-300 easeInOut rounded focus:outline-none focus:border-secondary placeholder:text-sm placeholder:text-grapeshade" />

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
    <div id = "securitysetting" className="rounded border border-appGray-450 hover:shadow-sm">
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
