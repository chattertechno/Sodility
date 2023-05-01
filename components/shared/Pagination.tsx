'use client'

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { P1 } from "../typography";

const Pagination = ({ title }: { title: string }) => (
  <div className="flex justify-between items-center mt-10">
    <P1>{title} 1 - 16 of 127</P1>
    {/* buttons  */}
    <div className="space-x-1 flex items-center">
      <button className="border border-gray-200 text-gray-200 hover:border-gray-400 hover:text-gray-400 px-2 text-[10px] py-1.5 rounded-md">
        <FaChevronLeft />
      </button>
      <button className="border border-primary text-primary px-2.5 text-[10px] py-1 rounded-md">
        1
      </button>
      <button className="border border-gray-400 text-gray-400 px-2.5 text-[10px] py-1 rounded-md">
        2
      </button>
      <button className="border border-gray-400 text-gray-400 px-2.5 text-[10px] py-1 rounded-md">
        ...
      </button>
      <button className="border border-gray-400 text-gray-400 px-2.5 text-[10px] py-1 rounded-md">
        8
      </button>
      <button className="border border-gray-200 text-gray-200 hover:border-gray-400 hover:text-gray-400 px-2 text-[10px] py-1.5 rounded-md">
        <FaChevronRight />
      </button>
    </div>
  </div>
);

export default Pagination;
