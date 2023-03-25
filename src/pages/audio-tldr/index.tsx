import Head from "next/head";
import { useState } from "react";
import InputText from "@/components/InputText";
import Button from "@/components/Button";

export default function Page() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const body = new FormData();
    body.append("file", file);

    try {
      setIsLoading(true);

      const response = await fetch("/api/audio-tldr", {
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

      console.log("Response data", data);

      // setResult(JSON.parse(data.result));
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleFileUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    setFile(file);
  }

  return (
    <>
      <Head>
        <title>Audio tl:dr;</title>
      </Head>

      <div className="flex p-8">
        <main className="flex flex-col w-80">
          <h3 className="mb-6 text-xl font-semibold">Audio tl:dr;</h3>

          <div className="flex flex-col w-full gap-y-2">
            <input type="file" name="" id="" onChange={handleFileUpload} />
            <Button onClick={onSubmit} color="primary" disabled={!file}>
              Submit
            </Button>
          </div>

          <div className="w-full border-gray-700 text-center py-6 px-2">
            {isLoading ? "Uploading..." : result}
          </div>
        </main>
      </div>
    </>
  );
}
