"use client";

import React, { useState } from "react";
import {
  BadgeEuro,
  CircleArrowLeft,
  FileText,
  DollarSign,
  Target,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

function Sidebar({ children }) {
  const [open, setOpen] = useState(true);

  const [expensesOpen, setExpensesOpen] = useState(false);
  const [incomesOpen, setIncomesOpen] = useState(false);
  const [goalsOpen, setGoalsOpen] = useState(false);

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
          {/* Expenses Accordion */}
          <li
            className={`flex flex-col p-2 cursor-pointer hover:bg-light-white text-sm items-start gap-y-2 mt-2 text-yellow-300`}
          >
            <button
              onClick={() => setExpensesOpen(!expensesOpen)}
              className={`${
                !open && "hidden"
              } origin-left pb-1 duration-200 flex gap-x-2 items-center text-lg relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-yellow-300 hover:after:w-full after:transition-all after:duration-300 active:scale-95 active:transition-all active:duration-150`}
            >
              <FileText size={20} />
              Expenses
            </button>

            <ul
              className={`overflow-hidden transition-all duration-300 text-yellow-300 ${
                expensesOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <li>
                <Link
                  href={`/expenses`}
                  className="py-1 pl-4 flex items-center gap-1 hover:scale-110 transform transition duration-300"
                >
                  List
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link
                  href={`/expenses/create`}
                  className="py-1 pl-4 flex items-center gap-1 hover:scale-110 transform transition duration-300"
                >
                  Add new
                  <ArrowUpRight />
                </Link>
              </li>
            </ul>
          </li>

          {/* Incomes Accordion */}
          <li
            className={`flex flex-col p-2 cursor-pointer hover:bg-light-white text-sm items-start gap-y-2 mt-2 text-yellow-300`}
          >
            <button
              onClick={() => setIncomesOpen(!incomesOpen)}
              className={`${
                !open && "hidden"
              } origin-left pb-1 duration-200 flex gap-x-2 items-center text-lg relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-yellow-300 hover:after:w-full after:transition-all after:duration-300 active:scale-95 active:transition-all active:duration-150`}
            >
              <DollarSign size={20} />
              Incomes
            </button>

            <ul
              className={`overflow-hidden transition-all duration-300 text-yellow-300 ${
                incomesOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <li>
                <Link
                  href={`/incomes`}
                  className="py-1 pl-4 flex items-center gap-1 hover:scale-110 transform transition duration-300"
                >
                  List
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link
                  href={`/incomes/create`}
                  className="py-1 pl-4 flex items-center gap-1 hover:scale-110 transform transition duration-300"
                >
                  Add new
                  <ArrowUpRight />
                </Link>
              </li>
            </ul>
          </li>

          <li
            className={`flex flex-col p-2 cursor-pointer hover:bg-light-white text-sm items-start gap-y-2 mt-2 text-yellow-300`}
          >
            <button
              onClick={() => setGoalsOpen(!goalsOpen)}
              className={`${
                !open && "hidden"
              } origin-left pb-1 duration-200 flex gap-x-2 items-center text-lg relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-yellow-300 hover:after:w-full after:transition-all after:duration-300 active:scale-95 active:transition-all active:duration-150`}
            >
              <Target size={20} />
              Goals
            </button>

            <ul
              className={`overflow-hidden transition-all duration-300 text-yellow-300 ${
                goalsOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <li>
                <Link
                  href={`/goals`}
                  className="py-1 pl-4 flex items-center gap-1 hover:scale-110 transform transition duration-300"
                >
                  List
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link
                  href={`/goals/create`}
                  className="py-1 pl-4 flex items-center gap-1 hover:scale-110 transform transition duration-300"
                >
                  Add new
                  <ArrowUpRight />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-7 overflow-y-auto h-full text-white font-hat font-extralight">
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
