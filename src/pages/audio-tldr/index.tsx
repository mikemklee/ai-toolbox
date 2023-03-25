import Head from "next/head";
import { useState } from "react";
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

  async function handleFileUpload(event: any) {
    const file = event.target.files[0];
    console.log("File?", file);
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    try {
      const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        fileReader.onload = (e) => {
          resolve(fileReader.result as ArrayBuffer);
        };
        fileReader.onerror = (e) => {
          reject(e);
        };
      });

      const audioContext = new AudioContext();
      const decodedBuffer = await audioContext.decodeAudioData(buffer);
      // Do something with the audio buffer here
      console.log(decodedBuffer);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Head>
        <title>Audio tl:dr;</title>
      </Head>

      <div className="flex p-8">
        <main className="flex flex-col w-80">
          <h3 className="mb-6 text-xl font-semibold">Audio tl:dr;</h3>

          <input type="file" name="" id="" onChange={handleFileUpload} />

          {/* <div className="flex flex-col w-full gap-y-2">
            <InputText
              value={patternInput}
              placeholder="Enter CSS rules here"
              onChange={(e) => setPatternInput(e.target.value)}
            />

            <Button onClick={onSubmit} color="primary">
              Go
            </Button>
          </div>

          <div className="w-full border-gray-700 text-center py-6 px-2">
            {isLoading ? "Generating a response..." : result}
          </div> */}
        </main>
      </div>
    </>
  );
}
