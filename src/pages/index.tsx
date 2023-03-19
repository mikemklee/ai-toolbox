import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mike's AI Toolbox</title>
        <meta name="description" content="What can we build with AI?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="flex">
          <Sidebar />
          <main className="flex flex-col justify-between items-center p-6 min-h-screen flex-1">
            <h1 className="text-2xl">
              Let's explore what we can build with AI
            </h1>
          </main>
        </div>
      </div>
    </>
  );
}
