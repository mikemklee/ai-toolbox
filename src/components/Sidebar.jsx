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
          <Link href="/page1">
            Page 1
          </Link>
        </li>
        <li>
          <Link href="/page2">
            Page 2
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
