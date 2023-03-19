import Head from "next/head";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import InputText from "@/components/InputText";
import Button from "@/components/Button";

export default function Page() {
  const [patternInput, setPatternInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
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
    } catch (error: any) {
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

          <div className="flex flex-col w-full">
            <InputText
              value={patternInput}
              placeholder="Enter CSS rules here"
              onChange={(e) => setPatternInput(e.target.value)}
            />

            <Button onClick={onSubmit}>Go</Button>
          </div>

          <div className="w-full border-gray-700 text-center py-6 px-2">
            {isLoading ? "Generating a response..." : result}
          </div>
        </main>
      </div>
    </>
  );
}
