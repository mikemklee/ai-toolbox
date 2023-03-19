import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mike&apos;s AI Toolbox</title>
        <meta name="description" content="What can we build with AI?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex p-8">
        <main>
          <h1 className="">Let&apos;s explore what we can build with AI!</h1>
        </main>
      </div>
    </>
  );
}
