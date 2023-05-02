"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// COMPONENTS
import { Button, DropDown, SearchInput } from "@/components/shared";
import { P1, SubH1 } from "../typography";
// Icons
import { FaAngleDown } from "react-icons/fa";

// ASSETS
import userPlaceholder from "@/assets/index/avatar.png";
import logo from "@/assets/logo.png";
import { useAppDispatch } from "@/context/hooks";
import { openModal } from "@/context/features/modal/modalSlice";
import { getLocaleData,removeLocaleData } from "../../service/authService";
import { successToast } from "../../helper/toster";

// ==========================================
// HEADER LAYOUT COMPONENT ==================
// ==========================================
export default function Header() {
  const [userType, setUserType]= useState("public");
  const [user, setUser]= useState(null);

  useEffect(()=>{
    const _user = getLocaleData("user") as any
    setUser(_user)
    setUserType(_user?.role || "public")
  },[userType])
  const pathname = usePathname();
  const connectedUser =
    pathname === "/supporter"
      ? true
      : pathname === "/creator-creator"
      ? true
      : false;

  // const userType =
  //   pathname === "/supporter"
  //     ? "supporter"
  //     : pathname?.includes("/creator") || pathname == "/dashboard"
  //     ? "creator"
  //     : "public";
  return (
    <header className="py-7 border-b border-b-appGray-400">
      <div className="md:w-[90%] mx-auto  px-6 flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center">
          <a href="/#">
            <Image src={logo} alt="logo" />
          </a>
          <SearchInput />
        </div>

        {/* navigation  */}
        {userType === "public" && (
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <Navigation />
            <Button
              variant="primary"
              className="py-3"
              action={() => {}}
              type="button"
            >
              Get Started
            </Button>
          </div>
        )}
        {userType === "supporter" 
        // && connectedUser 
        ? (
          <SupporterNavigation user={user} />
        ) : userType === "creator" 
        // && true 
        ? (
          <CreatorNavigation user={user} />
        ) : userType !== "public" 
        && !connectedUser 
        ? (
          <Button action={() => {}}>ConnectDash</Button>
        ) : null}
      </div>
    </header>
  );
}

// EXTENDED COMPONENTS ======================
const Navigation = () => {
  const pathname = usePathname();
  const [auth, setAuth] = useState<any>("")

  const [dropDownActive, setDropDownActive] = useState(false);

  const navList = [
    { name: "Home", link: "/", active: pathname === "/", hasDropDown: false },
    {
      name: "Explore",
      link: "/explore",
      active: pathname === "/explore/*",
      hasDropDown: true,
      dropDown: {
        left: [
          {
            name: "Writers & Journalists",
            link: "/explore/writers-and-journalists",
          },
          { name: "Gaming Creators", link: "/explore/gaming-creators" },
          { name: "Non-Profits", link: "/explore/non-profits" },
          { name: "Local Businesses", link: "/explore/local-business" },
          {
            name: "Tutorials & Education",
            link: "/explore/tutorials-and-education",
          },
        ],
        right: [
          { name: "Podcasters", link: "/explore/podcasters" },
          { name: "Video Creators", link: "/explore/video-creators" },
          { name: "Musicians", link: "/explore/musicians" },
          { name: "Visual Artists", link: "/explore/visual-artist" },
          { name: "Communities", link: "/explore/communities" },
        ],
      },
    },
    {
      name: "About",
      link: "/about",
      active: pathname === "/about",
      hasDropDown: false,
    },
     {
      name: "Login",
      link: "/login",
      active: pathname === "/login",
      hasDropDown: false,
    },
  ];

  useEffect(() => {
    const token = getLocaleData('token');
    setAuth(token);
  }, [auth]);
  // RETURN ==============================================================
  return (
    <nav className="flex gap-10">
      {navList.map((navItem) => (
        <div key={navItem.name} className="flex">
          {navItem.hasDropDown ? (
            <div
              onClick={() => setDropDownActive(!dropDownActive)}
              className={`text-sm cursor-pointer relative`}
            >
              <div
                className={`${
                  dropDownActive
                    ? "text-black font-semibold hover:text-primary"
                    : "text-[#393e49] hover:text-primary"
                } text-sm  flex gap-1 items-center`}
              >
                <SubH1>{navItem.name}</SubH1>
                {navItem.hasDropDown && (
                  <FaAngleDown
                    className={`${
                      dropDownActive && "rotate-180"
                    } transition duration-300`}
                  />
                )}
              </div>
              {dropDownActive && navItem.hasDropDown && (
                <DropDown
                  parentPositionAndPadding="top-10 left-[-100%] p-5"
                  arrowPosition="-top-2 left-20"
                >
                  <ul className="py-2 pt-5 bg-white relative flex justify-between">
                    <div>
                      {navItem.dropDown!.left.map((dropDownItem) => (
                        <Link
                          key={dropDownItem.name}
                          href={dropDownItem.link}
                          onClick={() => setDropDownActive(!dropDownActive)}
                          className={`${
                            navItem.active
                              ? "text-primary"
                              : "text-[#393e49] hover:text-primary"
                          } text-sm`}
                        >
                          <li className="px-4 py-2 ">{dropDownItem.name}</li>
                        </Link>
                      ))}
                    </div>
                    <div>
                      {navItem.dropDown!.right.map((dropDownItem) => (
                        <Link
                          key={dropDownItem.name}
                          href={dropDownItem.link}
                          onClick={() => setDropDownActive(!dropDownActive)}
                          className={`${
                            navItem.active
                              ? "text-primary"
                              : "text-[#393e49] hover:text-primary"
                          } text-sm`}
                        >
                          <li className="px-4 py-2 ">{dropDownItem.name}</li>
                        </Link>
                      ))}
                    </div>
                  </ul>
                </DropDown>
              )}
            </div>
          ) : (
            <Link
              key={navItem.name}
              href={navItem.link}
              onClick={() => setDropDownActive(false)}
              className={`${
                navItem.active
                  ? "text-primary font-semibold"
                  : "text-[#393e49] hover:text-primary"
              } text-sm`}
            >
              <SubH1>{navItem.name}</SubH1>
            </Link>
          )}
        </div>
      ))}
     {/* {!auth ?(<Link
              key={`Login`}
              href={`/login`}
              // onClick={() => signIn()}
              className={`${
                // navItem.active
                //   ? 
                  "text-primary font-semibold"
                  // : "text-[#393e49] hover:text-primary"
              } text-sm`}
            >
              <SubH1>Login</SubH1>
            </Link>) :(<Link
        key={"logout"}
        href="/"
        onClick={() => {
          window.location.href = "/"
        }}
        className={`${
          // navItem.active
          // ?
          "text-primary font-semibold"
          // :
          // "text-[#393e49] hover:text-primary"
        } text-sm`}
      >
        <SubH1>Logout</SubH1>
      </Link>)} */}
    </nav>
  );
};

const SupporterNavigation = ({user}:any) => {
  const pathname = usePathname();
  const [dropDownActive, setDropDownActive] = useState(false);

  const navList = [
    {
      name: "Dashboard",
      link: "/supporter",
      active: pathname === "/supporter",
    },
    {
      name: "My Page Settings",
      link: "/",
      active: pathname === "/page-settings",
    },
    {
      name: "My Profile",
      link: "/",
      active: pathname === "/profile",
    },
    {
      name: "Settings",
      link: "/",
      active: pathname === "/settings",
    },
    {
      name: "Help & FAQ",
      link: "/",
      active: pathname === "/faq",
    },
    {
      name: "Log Out",
      link: "/",
      active: pathname === "/log-out",
    },
  ];

  // RETURN   ==================================================
  return (
    <nav
      className="flex gap-2 items-center cursor-pointer relative"
      onClick={() => setDropDownActive(!dropDownActive)}
    >
      <P1>{user?.username}</P1>
      <div className="">
        <Image
          src={userPlaceholder}
          alt="user image"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div>
        <FaAngleDown
          className={`${
            dropDownActive && "rotate-180"
          } transition duration-300`}
        />
      </div>
      {/* dropDown navigation  */}
      {dropDownActive && (
        <DropDown
          parentPositionAndPadding="top-16 right-0 !w-48 p-3"
          arrowPosition="-top-2 right-7"
        >
          <ul className="py-2 pt-5 bg-white relative flex flex-col justify-between">
            {navList.map((navItem) => (
              <Link
                key={navItem.name}
                href={navItem.link}
                onClick={navItem.name== "Log Out"?(()=>{
                  removeLocaleData("token")
                  removeLocaleData("user")
                  // router.push("/")
                  successToast("LogOut SuccessFully")
                  if(typeof window !== "undefined")
                    window.location.href = '/';
                }):(() => setDropDownActive(!dropDownActive))}
                className={`${
                  navItem.active
                    ? "text-primary"
                    : "text-[#393e49] hover:text-primary"
                } text-sm`}
              >
                <li className="px-4 py-2 ">{navItem.name}</li>
              </Link>
            ))}
          </ul>
        </DropDown>
      )}
    </nav>
  );
};

const CreatorNavigation = ({user}:any) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [dropDownActive, setDropDownActive] = useState(false);

  const navList = [
    {
      name: "Dashboard",
      link: "/creator-creator",
      active: pathname === "/creator-creator",
    },
    {
      name: "Add Post",
      link: pathname,
      active: pathname === "/add post",
    },
    {
      name: "My Page",
      link: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      name: "Creator Settings",
      link: "/",
      active: pathname === "/settings",
    },
    {
      name: "My Profile",
      link: "/profile",
      active: pathname === "/profile",
    },
    {
      name: "Help & FAQ",
      link: "/",
      active: pathname === "/faq",
    },
    {
      name: "Log Out",
      link: "/",
      active: pathname === "/log-out",
    },
  ];

  // RETURN   ==================================================
  return (
    <nav
      className="flex gap-2 items-center cursor-pointer relative"
      onClick={() => setDropDownActive(!dropDownActive)}
    >
      <P1>{user?.username}</P1>
      <div className="">
        <Image
          src={userPlaceholder}
          alt="user image"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div>
        <FaAngleDown
          className={`${
            dropDownActive && "rotate-180"
          } transition duration-300`}
        />
      </div>
      {/* dropDown navigation  */}
      {dropDownActive && (
        <DropDown
          parentPositionAndPadding="top-16 right-0 !w-48 p-3"
          arrowPosition="-top-2 right-7"
        >
          <ul className="py-2 pt-5 bg-white relative flex flex-col justify-between">
            {navList.map((navItem) => (
              <Link
                key={navItem.name}
                href={navItem.link}
                onClick={navItem.name== "Log Out"?(()=>{
                  removeLocaleData("token")
                  removeLocaleData("user")
                  // router.push("/")
                  successToast("LogOut SuccessFully")
                  if(typeof window !== "undefined")
                    window.location.href = '/';
                }):(navItem.name== "Add Post"?(()=>dispatch(openModal("addPost"))):() => setDropDownActive(!dropDownActive))}
                className={`${
                  navItem.active
                    ? "text-primary"
                    : "text-[#393e49] hover:text-primary"
                } text-sm`}
              >
                <li className="px-4 py-2 ">{navItem.name}</li>
              </Link>
            ))}
          </ul>
        </DropDown>
      )}
    </nav>
  );
};
