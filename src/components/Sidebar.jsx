import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <nav className="min-w-[16rem] px-4 h-screen flex flex-col bg-gray-100">
      <div className="py-4 border-b-2 border-b-gray-200 mb-4 font-semibold">
          <Link href="/">
            Mike&apos;s AI Toolbox
          </Link>
      </div>

      <div>
        <span className="font-semibold">
          Tools
        </span>
        <ul className="pl-2 list-none text-blue-600 flex flex-col gap-y-2">
          <li>
            <Link href="/smart-regex-input">
              Smart input with RegEx
            </Link>
          </li>
          <li>
            <Link href="/css2tw">
            CSS → Tailwind
            </Link>
          </li>
        </ul>
      </div>

      <div className="text-gray-400 mt-auto py-4 border-t-2 border-t-gray-200 ">
          <span>
            made by{" "}
            <a
              href="https://github.com/mikemklee"
              target="_blank"
              rel="noreferrer"
              className="hover:underline text-blue-600"
            >
              @mikemklee
            </a>
          </span>
        </div>
    </nav>
  );
};

export default Sidebar;
