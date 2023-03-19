import React from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
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
      
      <div className="text-gray-400 mt-auto">
          <span>
            made by{" "}
            <a
              href="https://github.com/mikemklee"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              @mikemklee
            </a>
          </span>
        </div>
    </nav>
  );
};

export default Sidebar;
