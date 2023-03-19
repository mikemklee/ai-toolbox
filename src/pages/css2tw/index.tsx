import Head from "next/head";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Page() {
  const [patternInput, setPatternInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/css2tw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: patternInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(JSON.parse(data.result));
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>CSS → Tailwind</title>
      </Head>

      <div className="flex">
        <Sidebar />
        <main className="w-80 mx-auto flex flex-col items-center mt-8">
          <h3 className="my-6 text-xl">CSS → Tailwind</h3>

          <form onSubmit={onSubmit} className="flex flex-col w-full">
            <input
              type="text"
              name="pattern"
              className="w-full p-2 rounded  border border-gray-700"
              placeholder="Enter CSS rules here"
              value={patternInput}
              onChange={(e) => setPatternInput(e.target.value)}
            />
            <input
              type="submit"
              value="Go"
              className="w-full p-2 rounded bg-gray-800 text-white mt-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            />
          </form>

          <div className="w-full border-gray-700 text-center py-6 px-2">
            {isLoading ? "Generating a response..." : result}
          </div>
        </main>
      </div>
    </>
  );
}
