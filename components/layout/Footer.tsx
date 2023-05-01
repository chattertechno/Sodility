"use client";
import Image from "next/image";

// ASSETS
import logo from "@/assets/logo.png";
import Link from "next/link";
import { SocialMedias } from "../shared";
import { H3, P1 } from "../typography";

function Footer() {
  const exploreNavLeft = [
    { name: "Writers & Journalists", link: "/" },
    { name: "Gaming Creators", link: "/" },
    { name: "Non-Profits", link: "/" },
    { name: "Local Businesses", link: "/" },
    { name: "Tutorials & Education", link: "/" },
  ];
  const exploreNavRight = [
    { name: "Podcasters", link: "/" },
    { name: "Video Creators", link: "/" },
    { name: "Musicians", link: "/" },
    { name: "Visual Artists", link: "/" },
    { name: "Communities", link: "/" },
  ];

  const companyNav = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Terms Of Use", link: "/" },
    { name: "Privacy Policy", link: "/" },
    { name: "Help", link: "/" },
  ];

  return (
    <footer className="py-28 pb-16 border-t border-t-appGray-450">
      <div className="md:w-[90%] mx-auto px-6">
        {/* top  */}
        <div className="flex flex-col md:flex-row gap-10 pb-16 border-b border-b-appGrey-400">
          {/* info */}
          <div className="md:w-2/6">
            <Image src={logo} alt="logo" width={120} height={120} />
            <P1 className="mt-2">
              Sodality was designed and built by the Dash Incubator community.
            </P1>
            <P1 className="">
              <a
                className="text-primary hover:underline"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                Find out more
              </a>
            </P1>
            {/* social medias  */}
            <SocialMedias />
          </div>
          {/* navigation  */}
          <div className="md:w-2/6">
            <H3>Explore</H3>
            <div className="flex gap-14 mt-4">
              <div className="space-y-3">
                {exploreNavLeft.map((item, i) => (
                  <P1 key={item.name} className="hover:text-primary">
                    <Link href={item.link}>{item.name}</Link>
                  </P1>
                ))}
              </div>
              <div className="space-y-3">
                {exploreNavRight.map((item, i) => (
                  <P1 key={item.name} className="hover:text-primary">
                    <Link href={item.link}>{item.name}</Link>
                  </P1>
                ))}
              </div>
            </div>
          </div>
          {/* newsletters */}
          <div className="">
            <H3>Newsletter</H3>
            <P1 className="mt-4">
              A curated list of our top creators and best content sent weekly,
              certified spam free.
            </P1>
            <div className="mt-4 flex items-center gap-2">
              <input
                className="w-3/4 h-10 px-4 border border-appGray-300 rounded-md focus:outline-none focus:border-primary"
                type="text"
                placeholder="Email Address"
              />
              <button className="w-1/4 h-10 bg-primary text-white rounded-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* bottom  */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between">
          {/* copy right */}
          <P1 className=" text-appGray-500">
            © {new Date().getFullYear()} Sodality. Some rights reserved.
          </P1>
          {/* navigation */}
          <div className="flex space-x-4">
            {companyNav.map(item => (
              <P1 key={item.name} className="hover:text-primary">
                <Link href={item.link}>{item.name}</Link>
              </P1>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
