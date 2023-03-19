import Head from "next/head";
import { useState } from "react";

import styles from "./index.module.css";
import Sidebar from "@/components/Sidebar";

export default function Page() {
  const [patternInput, setPatternInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event) {
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
        throw data.error || new Error(`Request failed with status ${response.status}`);
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
        <title>Smart input with RegEx</title>
      </Head>

      <div className="flex">
        <Sidebar />
        <main className={styles.main}>
        <h3>Explain RegEx like I&apos;m 5</h3>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="pattern"
            placeholder="Enter a RegEx pattern e.g. ^[a-z]$"
            value={patternInput}
            onChange={(e) => setPatternInput(e.target.value)}
          />
          <input type="submit" value="Explain the pattern" />
        </form>

        {result ? (
          <div className={styles.result}>
            <h4>Description</h4>
            <ul>
              {result.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {isLoading ? <div className={styles.loading}>Generating a response...</div> : null}
      </main>
      </div>
    </>
  );
}