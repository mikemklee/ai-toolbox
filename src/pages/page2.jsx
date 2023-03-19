
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Sidebar from "../components/Sidebar";

export default function Page2() {
  return (
    <>
      <Head>
        <title>Page 2</title>
      </Head>

      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
          <h1 className="text-3xl font-bold underline">Page 2</h1>
        </main>
      </div>
    </>
  );
}