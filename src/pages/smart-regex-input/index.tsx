import Head from "next/head";
import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import InputText from "@/components/InputText";
import Button from "@/components/Button";

export default function Page() {
  const [patternInput, setPatternInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string[] | null>(null);

  async function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/smart-regex-input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pattern: patternInput }),
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
        <title>Smart input with RegEx</title>
      </Head>

      <div className="flex">
        <Sidebar />
        <main className="w-80 mx-auto flex flex-col items-center mt-8">
          <h3 className="my-6 text-xl">Explain RegEx like I&apos;m 5</h3>

          <div className="flex flex-col w-full">
            <InputText
              value={patternInput}
              placeholder="Enter a RegEx pattern e.g. ^[a-z]$"
              onChange={(e) => setPatternInput(e.target.value)}
            />

            <Button onClick={onSubmit}>Explain the pattern</Button>
          </div>

          {result && (
            <div className="mt-10 w-full flex flex-col justify-start">
              <span className="font-semibold">Description</span>
              <ul className="list-disc pl-6">
                {result.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {isLoading ? (
            <div className="mt-10">Generating a response...</div>
          ) : null}
        </main>
      </div>
    </>
  );
}
