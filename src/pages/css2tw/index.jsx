import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";

export default function Page() {
  return (
    <>
      <Head>
        <title>CSS → Tailwind</title>
      </Head>

      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
          <h1 className="text-3xl font-bold underline">CSS → Tailwind</h1>
        </main>
      </div>
    </>
  );
}