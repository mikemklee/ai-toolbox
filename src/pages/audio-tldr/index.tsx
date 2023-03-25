import Head from "next/head";
import { useState } from "react";
import Button from "@/components/Button";

export default function Page() {
  const [file, setFile] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionResult, setTranscriptionResult] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryResult, setSummaryResult] = useState<string[] | null>(null);

  function handleFileUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    setFile(file);
  }

  async function handleTranscription() {
    if (!file) {
      console.error("No file selected");
      return;
    }

    setTranscriptionResult(null);
    setSummaryResult(null);

    const body = new FormData();
    body.append("file", file);

    try {
      setIsTranscribing(true);

      const response = await fetch("/api/transcribe-audio", {
        method: "POST",
        body,
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setTranscriptionResult(data.result);

      handleSummary(data.result);
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally {
      setIsTranscribing(false);
    }
  }

  async function handleSummary(input: string) {
    if (!input) {
      console.error("Nothing to summarize");
      return;
    }

    try {
      setIsSummarizing(true);

      const response = await fetch("/api/summarize-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setSummaryResult(JSON.parse(data.result));
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally {
      setIsSummarizing(false);
    }
  }

  return (
    <>
      <Head>
        <title>Audio tl:dr;</title>
      </Head>

      <div className="flex p-8">
        <main className="flex flex-col">
          <h3 className="mb-6 text-xl font-semibold">Audio tl:dr;</h3>

          <div className="flex flex-col gap-y-2 w-80">
            <input type="file" name="" id="" onChange={handleFileUpload} />
            <Button
              onClick={handleTranscription}
              color="primary"
              disabled={!file}
            >
              Submit
            </Button>
          </div>

          {(isTranscribing || isSummarizing) && (
            <div className="w-full border-gray-700 text-center py-6 px-2">
              {isTranscribing && <p>Transcribing...</p>}
              {isSummarizing && <p>Summarizing...</p>}
            </div>
          )}

          {summaryResult && (
            <div className="mt-4">
              <span className="font-semibold text-lg">Summary</span>
              <ul className="list-disc list-inside">
                {summaryResult.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={`mt-4 ${transcriptionResult ? "visible" : "hidden"}`}>
            <span className="font-semibold text-lg">Full script</span>
            <p>{transcriptionResult}</p>
          </div>
        </main>
      </div>
    </>
  );
}
