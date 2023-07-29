"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

// Nav link component
const NavLink = ({ text, url }: { text: string; url: string }) => {
  return (
    <li className="mx-4 my-5 md:my-0">
      <Link
        href={url}
        className="text-base text-label font-bold hover:text-primary duration-300"
      >
        {text}
      </Link>
    </li>
  );
};

const navLinksArr = [
  { text: "المباريات", url: "/matches" },
  { text: "الدوري الإنجليزي", url: "/" },
  { text: "الدوري المصري", url: "/" },
  { text: "كل الدوريات", url: "/leagues" },
];

export default function Header() {
  const [isOpened, setIsOpened] = useState(false);
  const handleClick = () => setIsOpened(!isOpened);
  return (
    <header className="relative z-[100] bg-white border-b border-stroke">
      <nav className="py-5  bg-white  md:flex md:items-center md:justify-between mx-4 md:mx-20 lg:mx-32 3xl:max-w-[1400px] 3xl:m-auto">
        <div className="flex justify-between items-center ">
          <Link href="/" className="text-2xl">
            LOGO
          </Link>

          <button
            className="w-6 text-3xl cursor-pointer mx-2 md:hidden"
            onClick={handleClick}
          >
            {isOpened ? <XMarkIcon /> : <Bars3Icon />}
          </button>
        </div>

        <ul
          className={`md:flex md:items-center z-[-1] md:z-[1] md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-2 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-300 ${
            isOpened && "top-[71px] opacity-100"
          }`}
        >
          {/* loop through nav links */}
          {navLinksArr.map((link) => (
            <NavLink key={link.text} text={link.text} url={link.url} />
          ))}
        </ul>
      </nav>
    </header>
  );
}
