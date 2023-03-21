import Head from "next/head";
import { useState } from "react";

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
      const response = await fetch("/api/explain-regex", {
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

  const [userInput, setUserInput] = useState("");
  const [validationPattern, setValidationPattern] = useState("^[a-z]$");

  return (
    <>
      <Head>
        <title>Smart input with RegEx</title>
      </Head>

      <div className="flex p-8">
        <main className="flex flex-col w-80">
          <section>
            <h3 className="mb-6 text-lg font-semibold">
              Application 1: Explain a RegEx pattern
            </h3>

            <div className="flex flex-col w-full gap-y-2">
              <InputText
                value={patternInput}
                placeholder="Enter a RegEx pattern (e.g. ^[a-z]$)"
                onChange={(e) => setPatternInput(e.target.value)}
              />

              <Button onClick={onSubmit} color="primary">
                Explain the pattern
              </Button>
            </div>

            {result && (
              <div className="mt-4 w-full flex flex-col justify-start">
                <span className="font-semibold">Description</span>
                <ul className="list-disc pl-6">
                  {result.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {isLoading ? (
              <div className="mt-4">Generating a response...</div>
            ) : null}
          </section>

          <section className="mt-8 pt-8 border-t-2 border-b-gray-200">
            <h3 className="mb-6 text-lg font-semibold">
              Application 2: Validate user input
            </h3>

            <div className="flex flex-col w-full gap-y-2">
              <span className="font-semibold">
                RegEx pattern to validate with
              </span>
              <InputText
                value={validationPattern}
                placeholder="Enter a RegEx pattern (e.g. ^[a-z]$)"
                onChange={(e) => setValidationPattern(e.target.value)}
              />

              <span className="font-semibold mt-2">User input</span>
              <InputText
                value={userInput}
                validationPattern={validationPattern}
                placeholder="Enter something to validate"
                onChange={(e) => setUserInput(e.target.value)}
              />

              <span className="font-semibold mt-2">Code example</span>
              <div className="p-2 bg-gray-100 rounded">
                <pre>
                  <code>
                    {`<InputComponent \n\tvalue="${userInput}"\n\tvalidationPattern="${validationPattern}"\n\t...\n/>`}
                  </code>
                </pre>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
