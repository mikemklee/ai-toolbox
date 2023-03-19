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
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<string[] | null>(
    null
  );

  async function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    event.preventDefault();

    const inputValue = event.target.value;

    try {
      setIsValidating(true);
      const response = await fetch("/api/validate-input-with-regex", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pattern: validationPattern, input: inputValue }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setValidationResult(JSON.parse(data.result));
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally {
      setIsValidating(false);
    }

    console.log("handleBlur", event.target.value);
  }

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

            <div className="flex flex-col w-full">
              <InputText
                value={patternInput}
                placeholder="Enter a RegEx pattern e.g. ^[a-z]$"
                onChange={(e) => setPatternInput(e.target.value)}
              />

              <Button onClick={onSubmit}>Explain the pattern</Button>
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

          <section className="mt-10">
            <h3 className="mb-6 text-lg font-semibold">
              Application 2: Validate user input
            </h3>

            <div className="flex flex-col w-full">
              <span className="font-semibold">
                RegEx pattern to validate with
              </span>
              <InputText
                value={validationPattern}
                placeholder="Enter a RegEx pattern e.g. ^[a-z]$"
                onChange={(e) => setValidationPattern(e.target.value)}
              />
              <span className="font-semibold mt-2">User input</span>
              <InputText
                value={userInput}
                onBlur={handleBlur}
                placeholder="Enter some text to validate"
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>

            <div className="w-full text-red-500 mt-4">
              {isValidating ? "Validating..." : validationResult}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
