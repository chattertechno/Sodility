// "use client";

import { Poppins } from "next/font/google";
import { ReactNode } from "react";

const poppins400 = Poppins({ subsets: ["latin"], weight: "400" });

// ================================================================
// BUTTON COMPONENT ===============================================
// ================================================================
const Button = ({
  variant = "primary",
  children,
  action,
  type = "button",
  className,
}: {
  variant?:
    | "primary"
    | "primary-outline"
    | "secondary"
    | "tertiary"
    | "quaternary";
  children: ReactNode;
  action: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}) => {
  let styles = "";

  // checking button variant
  if (variant === "primary") {
    styles = "bg-primary hover:bg-blue-500 !text-white";
  } else if (variant === "primary-outline") {
    styles =
      "border border-primary hover:bg-blue-500 !text-primary hover:!text-white";
  } else if (variant === "secondary") {
    styles = "bg-white hover:bg-gray-100 !text-primary border border-primary";
  } else if (variant === "tertiary") {
    styles = "bg-white hover:bg-gray-100 !text-primary border border-primary";
  } else if (variant === "quaternary") {
    styles = "bg-white hover:bg-gray-100 !text-primary border border-primary";
  }

  // RETURN ================================================================
  return (
    <button
      type={type}
      onClick={action}
      className={`${styles} py-3 px-5 rounded ${className} ${poppins400.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
