"use client";

import React, { useState } from "react";
import {
  BadgeEuro,
  CircleArrowLeft,
  FileText,
  DollarSign,
  Target,
} from "lucide-react";
import Link from "next/link";

function Sidebar({ children }) {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Expenses", href: "/expenses", icon: <FileText size={20} /> },
    { title: "Incomes", href: "/incomes", icon: <DollarSign size={20} /> },
    { title: "Goals", href: "/goals", icon: <Target size={20} /> },
  ];

  return (
    <div className="flex h-screen">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } navbar top-0 left-0 h-full p-5 pt-8 relative duration-300 bg-black`}
      >
        <CircleArrowLeft
          size={30}
          className={`absolute cursor-pointer -right-3 top-9 w-7 text-yellow-300 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <Link href={`/`} className="flex gap-x-1 items-center">
          <BadgeEuro
            size={40}
            className={`cursor-pointer duration-500 text-yellow-300 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-yellow-300 origin-left font-medium font-tektur text-3xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            pennywise
          </h1>
        </Link>
        <ul className="pt-12 font-hat">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 pb-2 text-yellow-300 ${
                Menu.gap ? "mt-9" : "mt-2"
              } ${index === 0 && "bg-light-white"}`}
            >
              {/* Add icon */}
              <Link
                href={`${Menu.href}`}
                className={`${
                  !open && "hidden"
                } origin-left duration-200 flex gap-x-2 pb-1 items-center text-lg relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-yellow-300 hover:after:w-full after:transition-all after:duration-300 active:scale-95 active:transition-all active:duration-150`}
              >
                <span className="text-yellow-300">{Menu.icon}</span>

                {Menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-7 overflow-y-auto h-full text-white font-hat font-extralight">
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
