import { ReactNode } from "react";

import { Poppins } from 'next/font/google';
const poppins600 = Poppins({ subsets: ['latin'], weight: '600'})
const poppins500 = Poppins({ subsets: ['latin'], weight: '500'})
const poppins400 = Poppins({ subsets: ['latin'], weight: '400'})

// ==================================================
// HEADINGS =========================================
// ==================================================
export const H1 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <h1 className={`text-[40px] capitalize ${className} ${poppins600.className}`}>
    {children}
  </h1>
);

export const H2 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => <h1 className={`text-[32px] ${className} ${poppins600.className}`}>{children}</h1>;

export const H3 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => <h1 className={`text-[24px] font-semibold ${className}`}>{children}</h1>;

export const H4 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => <h1 className={`text-[20px] ${className} ${poppins400.className}`}>{children}</h1>;

export const H5 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => <h1 className={`text-[16px] ${className} ${poppins500.className}`}>{children}</h1>;

// ==================================================
// SUB HEADINGS =====================================
// ==================================================
export const SubH1 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <h1 className={`text-[14px] ${className} ${poppins400.className}`}>
    {children}
  </h1>
);

export const SubH2 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <h1 className={`text-[12px] ${className}  ${poppins400.className}`}>
    {children}
  </h1>
);

// ====================================================
// PARAGRAPHS =========================================
// ====================================================

export const P1 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => <p className={`text-[14px] text-appGray-500 ${className} ${poppins400.className}`}>{children}</p>;

export const P2 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => <p className={`text-base ${className}  ${poppins400.className}`}>{children}</p>;

// ==================================================
// LINKS ============================================
// ==================================================
// export const NavLink = ({
//   className,
//   children,
// }: {
//   className?: string;
//   children: ReactNode;
// }) => (
//   <p className={`text-[14px] ${className} ${poppins400.className}`}>
//     {children}
//   </p>
// );